const express = require("express");

const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "username is already taken",
    });
  }

  const user = await User.create({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  }); //Harkirat used create method but lets try this
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    msg: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Error while logging may be because of Incorrect Inputs",
    });
  }
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  const userId = user._id;
  console.log(user._id);
  if (user) {
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    msg: "Error while logging",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateBody.safeParse(body);

  if (!success || body.password.length < 8) {
    console.log(body.password.length);
    res.status(411).json({
      msg: "Error while updating the user",
    });
  }
  const userId = req.userId;

  // const user=User.findOne({
  //     userId:userId
  // });

  // if(!user){
  //     res.status(403).json({
  //         msg:"User doesn't exists",
  //     })
  // }

  await User.updateOne(
    {
      _id: userId,
    },
    {
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    }
  );

  res.json({
    msg: "User data updated successfully",
  });
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId: userId });
    const id=account._id;
    await User.deleteOne({ _id: userId });
    await Account.deleteOne({ _id: id });
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/bulk", authMiddleware, async (req, res) => {
  // const authHeader = req.headers.authorization;
  // if (authHeader != req.userId) {
  //   return res.json({
  //     msg: "Invalid User",
  //   });
  // }
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          "$regex": filter,
        },
      },
      {
        lastName: {
          "$regex": filter,
        },
      },
    ],
    _id: {
      "$ne": req.userId,
    },
  });
  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
