const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      conflict: "User already exists with this email address",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token); //Cookies are part of the response, not part of your app setup.
  /*For THIS request, send THIS cookie back. */

  res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
});

module.exports = authRouter;
