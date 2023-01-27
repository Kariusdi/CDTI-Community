const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({

    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }

})

const collection = new mongoose.model("UserAccount", LoginSchema)
module.exports = collection