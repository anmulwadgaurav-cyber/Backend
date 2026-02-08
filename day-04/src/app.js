/*
- app.js ka purpose
- server create karna 
- server ko config karne (app.use, aise middleware use karna)
*/

const express = require("express");
const app = express(); //server create ho jaata hai

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("hi my name is gaurav vaijanath anmulwad");
});

//post notes
app.post("/notes", (req, res) => {
  notes.push(req.body);
  console.log(req.body);
  res.send("Note Created");
});

//get notes
app.get("/notes", (req, res) => {
  res.send(notes);
});

//params : for dynamic values
//"delete /notes/2"
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("note deleted successfully");
  console.log(req.params.index); // 2
});

//patch notes -> task: edit only author
//req.body = {authur: "This is updated"}
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].author = req.body.author;
  notes[req.params.index].title = req.body.title;
  res.send("Notes is updated")
});

module.exports = app; //app ko export kar diya jisse server.js me use kar sake

//abhi server ko server.js me start karenge aur app.js me server ko configure karenge
