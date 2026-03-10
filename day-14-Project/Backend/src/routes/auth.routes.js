const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { registerController, loginController, getmeController } = authController;
const identifyUser = require("../middlewares/auth.middleware");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", identifyUser, getmeController);

module.exports = authRouter;
