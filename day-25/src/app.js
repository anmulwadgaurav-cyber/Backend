import express from "express";
import authRouter from "./routes/auth.routes.js"; //.js (.extension) lagnaga mandatory hai
import handleError from "./middleware/error.middleware.js";
import dotenv from "dotenv"; //iska ek problem hai jis folder me import kiya hai sirf usme hi chalega

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(handleError); //ye middleware sabse aakhri me use hota hai

export default app;
