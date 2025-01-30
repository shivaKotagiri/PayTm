const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shivakumar29638:NitUxQ1jiAQrsaW7@paytmdb.xcdbb.mongodb.net/");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
