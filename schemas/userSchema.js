const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = Schema({
    name:{
        type: String,
        require :true
    },
    username :{
        type:String, 
        require:true,
        unique : true
    },
    email :{
        type:String, 
        require:true,
        unique : true
    },
    password :{
        type:String, 
        require:true,
    }
})

module.exports = mongoose.model("userSchema ", userSchema)