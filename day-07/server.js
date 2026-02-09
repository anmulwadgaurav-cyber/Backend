//server ko start karna and database se connect karna
require("dotenv").config();
const dns = require("./dns");
const app = require("./src/app");
const port = 8000;
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(port, () => {
  console.log(`Connection established on port ${port}`);
});
