//we implment this model using the 'class'.
const bcrypt = require("bcryptjs")
const userSchema = require("../schemas/userSchema");
const clc = require("cli-color")

const UserModel = class {

    constructor({ email, name, username, password }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    //non static method 
    registerUser() {
        return new Promise(async (resolve, reject) => {
            // console.log(this.name+" "+this.email +" "+this.password+" "+this.username)



            // saved in database
            try {

                //chekc the email or username is already exists or not.
                const userExitsOrNot = await userSchema.findOne({
                    $or: [{ email: this.email }, { username: this.username }]
                })

                // console.log("user ",userExitsOrNot)
                if (userExitsOrNot && userExitsOrNot.email === this.email) {
                    reject("Email already exists");
                }
                if (userExitsOrNot && userExitsOrNot.username === this.username) {
                    reject("Username already exists");
                }


                //first we hash the password.
                const hashPassword = await bcrypt.hash(this.password, Number(process.env.SALT));

                console.log(clc.magentaBright(hashPassword));

                //store in the schema
                const userObject = userSchema({
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: hashPassword
                })

                const userDb = await userObject.save();

                // console.log("data ", userObject)

                resolve(userDb);

            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = UserModel;


