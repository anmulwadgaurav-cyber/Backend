const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "TestPractice",
    folder: "Practice-Insta-Clone/posts",
  });

  const post = await postModel.create({
    //the models should be as it is from schema
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const userId = req.user.id;
  const userPosts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Posts fetched successfully",
    userPosts,
  });
}

async function getPostsDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const specificPost = await postModel.findById(postId);

  if (!specificPost) {
    return res.status(404).json({
      message: "Posts not found",
    });
  }

  const isValidUser = specificPost.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "User Not Found",
    });
  }

  res.status(200).json({
    message: "Posts Fetched Successfully",
    specificPost,
  });
}

async function likeController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const likePost = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    likePost,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostsDetailsController,
  likeController,
};
