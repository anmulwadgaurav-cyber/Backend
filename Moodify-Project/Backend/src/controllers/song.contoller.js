const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/moodify/posters",
    }),
  ]); //Promise.all -> song ki file and poster ko SATH me upload karega. iss vajah se time save hota hai

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "Song create successfully",
    song,
  });
}

async function getSong(req, res) {
  const { mood } = req.query;

  //http://localhost:5000/api/songs?mood=happy
  //mood=happy this is a media query
  //postmanAPI -> params section

  const song = await songModel.findOne({ mood });

  res.status(200).json({
    message: "Song fetched successfully",
    song,
  });
}

module.exports = { uploadSong, getSong };
