const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required for blacklisting"],
    },
  },
  {
    timestamps: true, //kab user ne token blacklist kiya tha ye pata chalta hai
  },
);

const blacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports = blacklistModel;
