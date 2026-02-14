const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DATABASE CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log("Some Error Occured", err);
    });
}

module.exports = connectDB;
