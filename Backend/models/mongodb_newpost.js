const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

    user:{
        type: String,
        require: true,
        // lowercase: true,
        // trim: true
    },
    blogs : [
        {
        name : String,
        content : String,
        img : String,
        time : String,
        }
    ],
})


const collection = new mongoose.model("Post", PostSchema)
module.exports = collection