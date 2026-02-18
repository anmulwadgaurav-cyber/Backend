const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

app.use(express.json()); 
//👆🏻 ye sirf data tabhi padhega jab woh raw format ho agar data form-data ho to express use by default read nahi kar paata
// iske liye hame ek package install karna padega uska naam hai multer
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

module.exports = app;
