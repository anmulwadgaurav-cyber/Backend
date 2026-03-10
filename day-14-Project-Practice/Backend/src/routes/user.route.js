const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const { followUserController, unfollowUserController, requestController } =
  userController;

userRoute.post("/follow/:username", identifyUser, followUserController);
userRoute.post("/unfollow/:username", identifyUser, unfollowUserController);
userRoute.post("/request/:username/:status", identifyUser, requestController);

module.exports = userRoute;
