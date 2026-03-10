const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is required for creating a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, //ham jo yaha par id create kar rahe hai woh kis database se milegi to woh "user" name ke collection se milegi
    ref: "User",
    required: [true, "User id is required for creating post"],
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
