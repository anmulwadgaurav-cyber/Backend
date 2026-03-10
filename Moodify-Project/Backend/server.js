const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

app.listen(5000, () => {
  console.log("Server is running of port 5000");
});
