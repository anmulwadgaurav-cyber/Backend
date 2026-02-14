require("./dns");
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

app.listen(8000, () => {
  console.log("SERVER IS LISTENING ON PORT 8000");
});
