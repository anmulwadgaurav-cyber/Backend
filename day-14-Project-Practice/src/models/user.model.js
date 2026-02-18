const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
  },
  bio: String,
  profilePhoto: {
    type: String,
    default:
      "https://ik.imagekit.io/ochzwoeqp/default-avatar.png?updatedAt=1771074242284",
  },
});

const userModel = mongoose.model("userDet", userSchema);

module.exports = userModel;
