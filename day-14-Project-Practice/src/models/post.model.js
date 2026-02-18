const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    required: [true, "Invalid Image URL"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, //yah field kisi dusre document ki id store karegi
    ref: "project_practice",
    require: [true, "User id is required for creating post"],
  },
});

const postModel = mongoose.model("prac-post", postSchema);

module.exports = postModel;
