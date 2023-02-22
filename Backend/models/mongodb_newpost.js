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
            avatar: String,
            name : String,
            email: String,
            content : String,
            img : String,
            date : String,
            time : String,
            comments: [{
                avatar: String,
                name : String,
                comment : String,
            }]
        }
    ],
})


const collection = new mongoose.model("Post", PostSchema)
module.exports = collection