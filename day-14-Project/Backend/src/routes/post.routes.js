const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

//POST /api/post [protected - only those user can create post which whom have their token]
// req.body = {caption, image-file}

postRouter.post(
  "/",
  upload.single("imageMedia"),
  identifyUser,
  postController.createPostController,
);
//jis bhi naam se ham frontend pe se data bhej rahe hai wahi naam upload.single me rahna chahiye

postRouter.get("/", identifyUser, postController.getPostController);

//GET /api/posts/details/:postId
//returns an detail about specific post using its id, also check whether the post belongs to the user that is requesting.

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

//@route POST /api/posts/like/:postId
//@description like a post with the id provided in the request params

postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);
postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostController,
);

//@route GET /api/posts/feed
//@description get the feed of the user, which contains the posts of the users that he follows
//@access PRIVATE

postRouter.get("/feed", identifyUser, postController.getFeedController);

module.exports = postRouter;
