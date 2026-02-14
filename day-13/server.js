require("./dns")
require("dotenv").config();
const app = require("./src/app");
const port = 3000;
const connectDB = require("./src/config/database");


connectDB();

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
