const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log("An Error Occured", err);
    });
}

module.exports = connectDB;
