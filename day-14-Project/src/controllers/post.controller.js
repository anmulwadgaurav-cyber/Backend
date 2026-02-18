const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;
const jwt = require("jsonwebtoken");

const imagekit = ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "PostContent",
    folder: "Insta-Clone-Project/posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id, //getting this from middleware req.user = decoded so indirectly decoded.id
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const userPosts = await postModel.find({ user: userId });
  //jis bhi post me user ki id userId ke barabar hai woh posts dedo

  res.status(200).json({
    message: "Posts Fetched Successfully",
    userPosts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const postSpecific = await postModel.findById(postId);

  if (!postSpecific) {
    return res.status(404).json({
      message: "Posts Not Found",
    });
  }

  const isValidUser = postSpecific.user.toString() === userId;
  //because we cant compare ObjectId directly

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  res.status(200).json({
    message: "Post fetched successfully..!",
    postSpecific,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
