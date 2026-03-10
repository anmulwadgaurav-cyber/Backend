const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exists",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You already follow ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You (${followerUsername}) are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have Unfollowed ${followeeUsername}`,
  });
}

async function updateUserController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;
  const update = req.params.update;

  if (!["accepted", "rejected"].includes(update)) {
    return res.status(400).json({
      message: "Invalid Update Type",
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = update;
  await followRequest.save(); //to update the document in the mongoDB

  res.status(200).json({
    message: `You ${update} the request of ${followerUsername}`,
    followRequest,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  updateUserController,
};
