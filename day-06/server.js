//server ko start karna
//database se connect karna
const dns = require("./dns");
const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://dbuser2005:SM4Fcz7eRAORG4Ko@cluster0.8hdcefa.mongodb.net/day-06",
    )
    .then(() => {
      console.log("Database Connected Successfully..!");
    })
    .catch((err) => {
      console.log("Connection Failed", err);
    });
}

connectToDB();

//uriLink/day-06 --> iss day-06 ka matlab day-06 naam ke database se connect karo agar hoga to acchi baat nahi to mongoose.connect automatically create kar dega

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
