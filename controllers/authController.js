const clc = require("cli-color");
const bcrypt = require("bcryptjs")
//file import.
const { registrationPageValidation, loginPageValidation } = require("../utils/authUtil");
const UserModel = require("../models/authModel");

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
        const returnedMessage = await UserModel.loginUser({ loginId})

        // console.log("returend message ", returnedMessage)
        //compare password.using bcryptjs.
        // console.log(clc.magentaBright(password))
        // console.log(password, returnedMessage.password)
        const isPaswordMatch = await bcrypt.compare(password, returnedMessage.password)

        // console.log("is match ", isPaswordMatch)

        //if password not match.
        if(!isPaswordMatch)
            {
                return res.send({
                    status : 400,
                    message: "password is wrong"
                })
            }

        return res.send({
            status: 200,
            message: "login done successfully",
        })
    } catch (error) {
        return res.send({
            status: 500,
            message : "internal server error",
            error: error
        })
    }
}




module.exports = { registrationController, loginController }