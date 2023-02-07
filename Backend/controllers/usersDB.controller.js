const posts = require("../models/mongodb_post.js")
const users = require("../models/mongodb_authen.js")
var session;

exports.profile = (req, res) => {
    res.render("profile")
}

exports.getUser_and_Posts = async (req, res) => {
    session = req.session

    try{
        const check = await users.findOne({email: session.userid})

        // console.log(posts.find( { "name" : check.name } ));

        res.render("profile", {username: check.name, email: check.email})
        
    }catch{
        res.send('Something went wrong')
    }

}

