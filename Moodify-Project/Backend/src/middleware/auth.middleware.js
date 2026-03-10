const userModel = require("../models/user.model");
const redis = require("../config/cache");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.TOKEN;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; //creating new value

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
