const {Router} = require("express");
const userController = require("../controllers/userController.js");
const userRouter = Router();
 
userRouter.get("/", userController.UserPage);
userRouter.get("/:id", userController.UserPage);

// userRouter.post("/changeAvatar", userController.login);
// userRouter.post("/register", userController.register);
// userRouter.post("/logout", userController.logout);
 
module.exports = userRouter;