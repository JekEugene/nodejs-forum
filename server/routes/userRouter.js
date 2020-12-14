const {Router} = require("express");
const userController = require("../controllers/userController.js");
const userRouter = Router();

userRouter.get("/:id", userController.UserPage);

userRouter.post("/:id/getPosts", userController.GetUserPosts);
 
module.exports = userRouter;