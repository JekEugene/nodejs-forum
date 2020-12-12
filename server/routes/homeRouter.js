const {Router} = require("express");
const authenticateToken = require("../middleware/authenticateToken")
const refreshToken = require("../middleware/refreshToken")
const homeController = require("../controllers/homeController.js");
const homeRouter = Router();
 
homeRouter.get("/",  homeController.homePage);

homeRouter.post("/login",   homeController.login);
homeRouter.post("/register",  homeController.register);
homeRouter.post("/logout", homeController.logout);
 
module.exports = homeRouter;