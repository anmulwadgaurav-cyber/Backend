const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const noteModel = require("./models/notes.model");

//middlewares
app.use(express.json()); //is middleware ke bina req.body ko samaj nahi sakoge bracket mat bhulna json ke aage galti se bhi
app.use(cors());
app.use(express.static("./public"));

//POST API /api/notes
//req.body = {title, description}
//create new note and save data in mongoDB

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  if (title === "" || description === "") {
    return;
  } else {
    const note = await noteModel.create({
      title,
      description,
    });
    res.status(201).json({
      message: "Note Created Succesfully",
      note,
    });
  }
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
  const { title, description } = req.body;
  let updatedNoteTitle = await noteModel.findByIdAndUpdate(id, { title });
  let updatedNoteDescription = await noteModel.findByIdAndUpdate(id, {
    description,
  });
  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

//findByIdAndUpdate second parameter hamesha object me bhejna

//dont forget async-await

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

//if we write http://localhost:8000/asfij8ajfoa8iew4 still it will return "this is wild card route" it means we if you give any url it will return the specific response.

module.exports = app;
