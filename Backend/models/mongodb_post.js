const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
        // lowercase: true,
        // trim: true
    },
    content:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    }

})


const collection = new mongoose.model("Post", PostSchema)
module.exports = collection