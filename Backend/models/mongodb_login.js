const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/login-signup")
.then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Failed to connect MongoDB')
})

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