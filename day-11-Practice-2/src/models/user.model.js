const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
  },
  password: String,
});

let userModel = mongoose.model("userTwo", userSchema);

module.exports = userModel;
