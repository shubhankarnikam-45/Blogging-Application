const clc = require("cli-color");
const { registrationPageValidation } = require("../utils/authUtil");
const UserModel = require("../models/authModel");

//registration controller.
const registrationController = async (req, res) => {

    //destructuring the input values.
    // console.log(req.body)
    // const { name, email, username, password } = req.body;
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
const loginController = (req, res) => {
    console.log(clc.yellowBright("login is successfull..."));
    return res.send({
        status: 200,
        message: "login done successfully"
    })
}

module.exports = { registrationController, loginController }