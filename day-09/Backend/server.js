//server ko start karna and database se connect krna

require("dotenv").config();
const dns = require("./dns");
const app = require("./src/app");
const connectDB = require("./src/config/database");
const port = 8000

connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
