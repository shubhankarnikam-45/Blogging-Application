const clc = require("cli-color");
const { registrationPageValidation } = require("../utils/authUtil");

//registration controller.
const registrationController = async(req, res) => {

    //destructuring the input values.
    // console.log(req.body)
    const {name, email,username, password} = req.body;
    // console.log(clc.bgMagenta(name, email, username, password));
    
    //data validation
    try {
        await registrationPageValidation({name, email, username, password})
    } catch (error) {
        return res.send({
            status : 400,
            message :"data invalid",
            error 
        })
    }

    console.log(clc.yellowBright("registration is successfull..."));
    return res.send({
        status: 200,
        message: "registration done successfully"
    })
}

//login controller.
const loginController = (req, res) => {
    console.log(clc.yellowBright("login is successfull..."));
    return res.send({
        status: 200,
        message: "login done successfully"
    })
}

module.exports = {registrationController, loginController}