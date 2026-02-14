//iss file ke andar register api create karenge
const express = require("express");
const authRouter = express.Router();
//agar aapki app.js file ke alawa kisi aur file me api create karni hai to uske liye aapko router ka use karna padta hai.
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

//POST method to register user with status code 201

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist with this email address",
    });
  }

  const userData = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign(
    {
      id: userData._id,
      email: userData.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered Successfully...",
    userData,
    token,
  });
});

module.exports = authRouter;
