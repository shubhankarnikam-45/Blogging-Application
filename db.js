const mongoose = require("mongoose");
const clc = require("cli-color");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(clc.greenBright("database connected sucessfully..."))
})
.catch((error)=>{
    console.log(clc.redBright("database is not connected...", error))
})