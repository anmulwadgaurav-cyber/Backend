const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, age, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      conflict: "User already exists with this email.",
    });
  }

  const user = await userModel.create({
    username,
    age,
    email,
    password,
  });

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user,
    token,
  });
});

module.exports = authRouter;
