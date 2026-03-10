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
    select: false,
    //select: false means we cant see it any way on the frontend - good practice
    //database me password save rahega lekin frontend ya kisi bhi api request me password nahi dikhega.
    //lekin ye login ke time pe problem create karta hai kyoki hum uss samay use db ke password ke sath compare kar rahe hote hai, lekin iss case me hum usse read hi nahi kar sakte.
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/ochzwoeqp/default-avatar.png",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
