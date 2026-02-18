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

module.exports = postRouter;
