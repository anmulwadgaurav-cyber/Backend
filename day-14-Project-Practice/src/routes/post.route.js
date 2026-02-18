const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createPostController, getPostsController, getPostsDetailsController } =
  postController;

postRouter.post("/", upload.single("imageMedia"), createPostController);
postRouter.get("/", getPostsController);
postRouter.get("/details/:postId", getPostsDetailsController);

module.exports = postRouter;
