const clc = require("cli-color");
const bcrypt = require("bcryptjs")
//file import.
const { registrationPageValidation, loginPageValidation } = require("../utils/authUtil");
const UserModel = require("../models/authModel");
const { rawListeners } = require("../schemas/userSchema");
const sessionSchema = require("../schemas/sessionSchema");

//registration controller.
const registrationController = async (req, res) => {

    //destructuring the input values.
    // console.log(req.body)
    const { name, email, username, password } = req.body;
    // console.log(clc.bgMagenta(name, email, username, password));

    //data validation
    try {
        await registrationPageValidation({ name, email, username, password })
    } catch (error) {
        return res.send({
            status: 400,
            message: "data invalid",
            error
        })
    }

    const UserObject = new UserModel({ name, email, username, password });

    try {

        //register user successfully.
        const userData = await UserObject.registerUser();
        // console.log(clc.yellowBright("registration is successfull...", userData));
        return res.send({
            status: 201,
            message: "user register successfully...",
            data: userData
        })


    } catch (error) {
        return res.send({
            status: 500,
            message: "internal server error",
            error: error
        });
    }
}

//login controller.
const loginController = async (req, res) => {
    // console.log(clc.yellowBright("login is successfull..."));
    console.log(req.session)
    // console.log("body",req.body);
    //destructuring.
    const { loginId, password } = req.body;
    // console.log(clc.magentaBright(loginId, password))

    //data validation.
    try {
        await loginPageValidation({ loginId, password })
    } catch (error) {
        return res.send({
            status: 400,
            message: "Data is invalid",
            error: error
        })
    }

    //now this below line interact with database.
    try {
        const returnedMessage = await UserModel.loginUser({ loginId })

        // console.log("returend message ", returnedMessage)
        //compare password.using bcryptjs.
        // console.log(clc.magentaBright(password))
        // console.log(password, returnedMessage.password)
        const isPaswordMatch = await bcrypt.compare(password, returnedMessage.password)

        // console.log("is match ", isPaswordMatch)

        //if password not match.
        if (!isPaswordMatch) {
            return res.send({
                status: 400,
                message: "password is wrong"
            })
        }

        //initialize the session.
        req.session.isAuth = true;
        req.session.user = {
            username: returnedMessage.username,
            email: returnedMessage.email,
            userId: returnedMessage._id
        };

        return res.send({
            status: 200,
            message: "login done successfully",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: "internal server error",
            error: error
        })
    }
}

//logout controller.
const logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({
                status: 500,
                message: "not logout successfully..."
            })
        }
        return res.send({
            status: 200,
            message: "logout successfully..."
        })
    })
}

//get request for the login page.
const loginFormController = (req, res) => {
    return res.render("loginForm")
}

//logout From All Devices
//private route.
const logoutFromAllDevices = async (req, res) => {

    // console.log(clc.magentaBright("logoutFromAllDevices"))
    // console.log("seeson look ", req.session.user.userId)
    const userId = req.session.user.userId;
    console.log("user id ", userId)
    try {
        const deletedEntry = await sessionSchema.deleteMany({
            "session.user.userId": userId
        })

        console.log("delted entry", deletedEntry);

        return res.send({
            status: 200,
            message: "logout from all device successful...",
            data: deletedEntry
        })
    } catch (error) {

        return res.send({
            status: 500,
            message: "logout from all device successful...",
            error: error
        })
    }


}




module.exports = { registrationController, loginController, logoutController, loginFormController, logoutFromAllDevices }