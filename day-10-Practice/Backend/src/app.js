const express = require("express");
const app = express();
const profileModel = require("./models/profile.model");
const cors = require("cors");
const path = require("path");

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("./public")); //public folder ke andar ke files ko available karta hai

//Create Profile - POST Method

app.post("/api/profile", async (req, res) => {
  const { username, age, skills } = req.body;
  let profile = await profileModel.create({
    username,
    age,
    skills,
  });
  res.status(201).json({
    message: "Profile Created Successfully",
    profile,
  });
});

//Fetch All Profiles - GET Method

app.get("/api/profile", async (req, res) => {
  let fetchedProfiles = await profileModel.find();
  res.status(200).json({
    message: "Fetched All Profiles",
    fetchedProfiles,
  });
});

//Delete Particular Profile - DELETE Method

app.delete("/api/profile/:id", async (req, res) => {
  let deletedProfile = await profileModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Profile Deleted Successfully..!",
  });
});

//Update Particular Profile - PATCH Method

app.patch("/api/profile/:id", async (req, res) => {
  const { username, age, skills } = req.body;

  let updateDetails = await profileModel.findByIdAndUpdate(
    req.params.id,
    { username, age, skills },
    // By default it returns the old document.
    // To return updated one, you must add:
    { new: true }, // 👈 THIS is the magic
  );

  res.status(200).json({
    message: "Profile Updated Successfully..!",
    updateDetails,
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
