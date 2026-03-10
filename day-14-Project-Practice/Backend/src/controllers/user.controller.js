const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exists",
    });
  }

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const follow = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(200).json({
    message: `now you follow ${followeeUsername}`,
    follow,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to unfollow does not exists",
    });
  }

  const unfollow = await followModel.findOneAndDelete({
    followee: followeeUsername,
    follower: followerUsername,
  });

  if (!unfollow) {
    return res.status(404).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  res.status(200).json({
    message: `you (${followerUsername}) unfollowed ${followeeUsername}`,
    unfollow,
  });
}

async function requestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;
  const updateStatus = req.params.status;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot update your own request",
    });
  }

  if (!["accepted", "rejected"].includes(updateStatus)) {
    return res.status(404).json({
      message: "Invalid status type",
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (followRequest.status !== "pending") {
    return res.status(400).json({
      message: `You already ${updateStatus} the request of ${followerUsername}`,
    });
  }

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = updateStatus;
  await followRequest.save();

  res.status(200).json({
    message: `You have ${updateStatus} the request of ${followerUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  requestController,
};
