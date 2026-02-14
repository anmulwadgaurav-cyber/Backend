const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");

app.use(express.json()); //this should be first in order
app.use(cookieParser()); //also this should be second in order
app.use("/api/auth", authRoute); //routes should be third and onwards 

module.exports = app;
