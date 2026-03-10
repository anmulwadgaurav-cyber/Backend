const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  createPostController,
  getPostsController,
  getPostsDetailsController,
  likeController,
} = postController;
const identifyUser = require("../middlewares/auth.middleware");

postRouter.post(
  "/",
  upload.single("imageMedia"),
  identifyUser,
  createPostController,
);
postRouter.get("/", identifyUser, getPostsController);
postRouter.get("/details/:postId", identifyUser, getPostsDetailsController);
postRouter.get("/like/:postId", identifyUser, likeController);

module.exports = postRouter;
