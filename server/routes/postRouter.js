
const {Router} = require("express");
const authenticateToken = require("../middleware/authenticateToken")
const postController = require("../controllers/postController.js");
const postRouter = Router();

postRouter.get("/get", postController.getPosts);
postRouter.get("/:id",  postController.postPage);
postRouter.get("/:id/getComments",  postController.getComments);


postRouter.post("/add",  authenticateToken,postController.addPost);
postRouter.post("/deletePost", authenticateToken,postController.deletePost);
postRouter.post("/addComment", authenticateToken,postController.addComment);
postRouter.post("/deleteComment", authenticateToken,postController.deleteComment);
 
module.exports = postRouter;