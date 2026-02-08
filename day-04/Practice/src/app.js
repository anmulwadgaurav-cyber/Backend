const express = require("express");
const app = express();
app.use(express.json());

const aboutArr = [];

app.post("/about", (req, res) => {
  console.log(req.body);
  res.send("Note Created");
  aboutArr.push(req.body);
});

app.get("/about", (req, res) => {
  res.send(aboutArr);
});

app.delete("/about/:idx", (req, res) => {
  delete aboutArr[req.params.idx];
  res.send("Entry Deleted Successfully..!");
});

app.patch("/about/:idx", (req, res) => {
  aboutArr[req.params.idx].name = req.body.name;
  aboutArr[req.params.idx].skills = req.body.skills;

  res.send("Note is Updated");
});

module.exports = app;
