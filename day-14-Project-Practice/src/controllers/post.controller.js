const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not porvided, Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "TestPractice",
    folder: "Practice-Insta-Clone/posts",
  });

  const post = await postModel.create({
    //the models should be as it is from schema
    caption: req.body.caption,
    imageUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const userId = decoded.id;
  const userPosts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Posts fetched successfully",
    userPosts,
  });
}

async function getPostsDetailsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  const userId = decoded.id;
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

module.exports = {
  createPostController,
  getPostsController,
  getPostsDetailsController,
};
