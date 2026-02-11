const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: String,
  age: Number,
  skills: String,
});

const profileModel = mongoose.model("userProfile", profileSchema);

module.exports = profileModel;
