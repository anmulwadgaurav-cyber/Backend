const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/ochzwoeqp/default-avatar.png",
  },
});

const userModel = mongoose.model("usersCollection", userSchema)

module.exports = userModel