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
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status can only be pending, accepted and rejected",
      },
    },
  },
  {
    timestamps: true, //ye batata hai ki document kab create hua tha and last time kab update hua tha
  },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });
//Ek hi follower kisi ek followee ko sirf ek baar follow kar sakta hai.

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
