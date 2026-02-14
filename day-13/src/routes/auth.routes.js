const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists with this email id",
    });
  }

  const user = await userModel.create({
    username,
    password: crypto.createHash("md5").update(password).digest("hex"),
    email,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email is NOT associated with the database",
    });
  }
  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "Welcome back",
    token,
  });
});

//to knwo who is requesting to the server
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.jwt_token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decode.id);

  res.status(200).json({
    name: user.username,
    email: user.email,
  });
});

module.exports = authRouter;
