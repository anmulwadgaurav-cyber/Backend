const express = require("express");
const app = express();
app.use(express.json()); //is middleware ke bina req.body ko samaj nahi sakoge bracket mat bhulna json ke aage galti se bhi
const noteModel = require("./models/notes.model");

//POST API /api/notes
//req.body = {title, description}
//create new note and save data in mongoDB

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note Created Succesfully",
    note,
  });
});

//GET API /api/notes
//Fetch all the data from mongodb and send it as response

app.get("/api/notes", async (req, res) => {
  const allFetchedNotes = await noteModel.find();

  res.status(200).json({
    message: "Notes Fetched Successfully!",
    allFetchedNotes,
  });
});

//find() method hamesha ek array return karegi with array of objects

//DELETE API /api/notes/:id
//Delete note with the id from req.params

app.delete("/api/notes/:id", async (req, res) => {
  const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Following Note Deleted Successfully",
    deletedNote,
  });
});

//PATCH API /api/notes/:id
//update the decription of the note by id
//req.body = {description}

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  let updatedNote = await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

//findByIdAndUpdate second parameter hamesha object me bhejna

//dont forget async-await

module.exports = app;
