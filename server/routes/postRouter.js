const {Router} = require("express");
const postController = require("../controllers/postController.js");
const postRouter = Router();
 
postRouter.get("/:id", postController.postPage);

postRouter.post("/add", postController.addPost);
postRouter.post("/delete", postController.deletePost);
postRouter.post("/addComment", postController.addComment);
postRouter.post("/deleteComment", postController.deleteComment);
 
module.exports = postRouter;