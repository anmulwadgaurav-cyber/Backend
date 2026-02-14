const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      conflict: "User already exists with this email address",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password:hash,
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

// POST /api/auth/protected

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    message: "This is a protected route",
  });
});

// POST /api/auth/login

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found with this email address" });
  }

  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid Password",
    }); 
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in successfully..!",
    user,
    token,
  });
});

module.exports = authRouter;
