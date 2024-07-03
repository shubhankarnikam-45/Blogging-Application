const clc = require("cli-color");
const express = require("express");

const authRouter = express.Router();

//file import.
const { registrationController, loginController, logoutController ,loginFormController} = require("../controllers/authController");
const isAuth = require("../middlewares/isAuthMiddleware");

//login page (get request)
authRouter.get("/login", loginFormController)
//registration
authRouter.post("/register", registrationController)

//login
authRouter.post("/login", loginController)

//logout.
authRouter.post("/logout", logoutController);

module.exports = authRouter;