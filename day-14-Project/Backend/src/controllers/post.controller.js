const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

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

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function unlikePostController(req, res) {
  const postId = req.params.postId;
  const user = req.user.username;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (!isLiked) {
    return res.status(400).json({
      message: "Post didn't like",
    });
  }

  await likeModel.findOneAndDelete({ _id: isLiked._id });

  return res.status(200).json({
    message: "Post unliked successfully",
  })
}

async function getFeedController(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().sort({ _id: -1 }).populate("user").lean()).map(
      async (post) => {
        const isLiked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });
        post.isLiked = !!isLiked; //jiske sirf true or false me result deta hai
        return post;
      },
    ),
  );
  //.populate() returns the all information related to the parameter provided in this case "user"
  //because in post schema we reffered the user collection
  //if we dont give the reference then we will not get the data.
  //.lean() mongooseObject (mongooseObject me ham nayi properties add nahi kar sakte) ko regular object me convert kar deti hai jis se ki ham data manipulate kar sake
  //.sort({ _id: -1 }) so that the recently created post will appear on first -> Last in first come

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
};
