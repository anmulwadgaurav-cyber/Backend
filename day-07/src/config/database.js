const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connection Successfull");
    })
    .catch((err) => {
      console.log("Error Occured", err);
    });
}

module.exports = connectToDB;
