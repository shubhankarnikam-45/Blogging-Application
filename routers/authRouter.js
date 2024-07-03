const clc = require("cli-color");
const express = require("express");

const authRouter = express.Router();

//file import.
const {registrationController, loginController} = require("../controllers/authController");
const isAuth = require("../middlewares/isAuthMiddleware");

//registration
authRouter.post("/register",registrationController)

//login
authRouter.post("/login", loginController)

module.exports = authRouter;