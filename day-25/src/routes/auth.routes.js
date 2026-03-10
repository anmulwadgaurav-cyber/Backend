import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidaiton } from "../validation/auth.validator.js";

const authRouter = Router();

//POST /api/auth/register
authRouter.post("/register", registerValidaiton, registerUser);

export default authRouter;
