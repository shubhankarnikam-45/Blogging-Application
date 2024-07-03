const clc = require("cli-color");
const express = require("express");

const authRouter = express.Router();

//file import.
const { registrationController, loginController, logoutController ,loginFormController,logoutFromAllDevices} = require("../controllers/authController");
const isAuth = require("../middlewares/isAuthMiddleware");

//login page (get request)
authRouter.get("/login", loginFormController)
//registration
authRouter.post("/register", registrationController)

//login
authRouter.post("/login", loginController)

//logout.
authRouter.post("/logout", isAuth,logoutController);

//logout from all devices.
authRouter.post("/logout_from_all_devices",isAuth, logoutFromAllDevices)

module.exports = authRouter;