const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "User with the same username or email already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("TOKEN", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password, username } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password"); //we hide the password but we need here to compare thats why we need to force for the password

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("TOKEN", token);

  return res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User fetched successfully...",
    user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.TOKEN;
  res.clearCookie("token");
  
  await redis.set(token, Date.now().toString(), "EX", 60*60);
  //redis stores data in key:value pair 
  //redis.set(key, value)
  //and it will expire in 1 hour aapna token ek ghante me apne aap delete ho jayega

  res.status(201).json({
    message: "Logout successfully",
  });
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
