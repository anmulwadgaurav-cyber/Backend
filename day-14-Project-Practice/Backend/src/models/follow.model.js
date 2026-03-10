const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status can only be pending, accepted and rejected",
      },
    },
  },
  {
    timestamps: true,
  },
);
const followModel = mongoose.model("follows", followSchema);
module.exports = followModel;
