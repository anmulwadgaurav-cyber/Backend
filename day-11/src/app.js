const express = require("express");
const app = express();
const userModel = require("./models/user.model");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json()); //so that we can read JSON data
app.use("/api/auth", authRouter); //iska matlab authRouter ke saath aapne jitne bhi api banaye unke saamne /api/auth prefix lagana padega
//so the whole url will be look like http://localhost:3000/api/auth/register
//its just a formality to look things better and beware of conflicts

module.exports = app;
