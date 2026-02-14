const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");

app.use(express.json()); //this should be first in order
app.use("/api/auth", authRoute);
app.use(cookieParser());

module.exports = app;
