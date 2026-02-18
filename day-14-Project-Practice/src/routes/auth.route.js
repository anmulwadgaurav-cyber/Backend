const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { registerController, loginController } = authController;

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

module.exports = authRouter;
