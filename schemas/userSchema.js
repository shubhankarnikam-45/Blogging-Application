const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({
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
        select : false,
    }
})

module.exports = mongoose.model("userSchema ", userSchema)