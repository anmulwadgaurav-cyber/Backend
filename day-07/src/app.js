//Server ko create karna

const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();
app.use(express.json()); //jabtak ye line na likhe tab tak req.body me data aayega hi nahi

//POST /notes
//req.body - {title, description}

let notesArr = [];

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
  notesArr.push({ title, description });
});

app.get("/notes", (req, res) => {
    res.status(200).json({
        notesArr
    })
});

module.exports = app;
