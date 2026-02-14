const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: [true, "User already exist with this account"],
  },
  age: Number,
  password: String,
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
