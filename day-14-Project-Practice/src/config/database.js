const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGO_URI);
  console.log("DATABASE CONNECTED SUCCESSFULLY");
}

module.exports = connectDB;
