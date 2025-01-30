const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({
    userId,
  });

  // if(!account){
  //     return res.json({
  //         msg:'Not a valid user to get balance',
  //     })
  // }

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const body = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (account.balance < body.amount || !account) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: body.to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid Account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -body.amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: body.to,
    },
    {
      $inc: {
        balance: body.amount, // Use `body.amount` here to correctly add the amount
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    msg: "Transfer Successful",
  });
});

module.exports = router;
