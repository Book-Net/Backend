const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : true
    },
    email:{
        type:String,
        unique:true,
    },
    password: {
        type:String,
        required:true
    }
    
})

const users = mongoose.model("Users", userSchema)
module.exports = users