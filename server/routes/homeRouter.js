const {Router} = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = Router();
 
homeRouter.get("/", homeController.homePage);
homeRouter.get("/token", homeController.refreshToken);

homeRouter.post("/login", homeController.login);
homeRouter.post("/register", homeController.register);
homeRouter.post("/logout", homeController.logout);
 
module.exports = homeRouter;