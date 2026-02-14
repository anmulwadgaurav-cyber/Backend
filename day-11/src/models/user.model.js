const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "User already exist with this email account"],
  },
  password: String,
});

let userModel = mongoose.model("users", userSchema);
//model's kuch bhi operations perform karne keliye use hota hai

module.exports = userModel;
