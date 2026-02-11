const app = require("./src/app");
const dns = require("./dns");
const connectDB = require("./src/config/database");
require("dotenv").config();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server is running of port 3000");
});
