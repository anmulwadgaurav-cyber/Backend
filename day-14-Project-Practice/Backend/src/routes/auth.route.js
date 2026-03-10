const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { registerController, loginController, getMeController } = authController;
const identifyUser = require("../middlewares/auth.middleware");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/get-me", identifyUser, getMeController);

module.exports = authRouter;
