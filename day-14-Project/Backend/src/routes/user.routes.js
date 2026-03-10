const express = require("express");
const userRoute = express.Router();
const identifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const { followUserController, unfollowUserController, updateUserController } =
  userController;

/*
@route POST /api/users/follow/:userId
@description follow a user
@access private
*/
userRoute.post("/follow/:username", identifyUser, followUserController);

/*
@route POST /api/users/unfollow/:userId
@description unfollow a user
@access private
*/
userRoute.post("/unfollow/:username", identifyUser, unfollowUserController);

/*
@route POST /api/users/status/:update
@description Update status
@access private
*/
userRoute.post("/status/:username/:update", identifyUser, updateUserController);

module.exports = userRoute;
