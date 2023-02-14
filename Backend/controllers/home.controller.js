const users = require("../models/mongodb_authen.js")
const posts = require("../models/mongodb_newpost.js")
var session;

exports.home = async (req, res) => {

    session = req.session

    if(session.userid){
        const user = await users.findOne({email: session.userid})

        posts.find((err, contents) => {
            if(err) {
                console.log('Failed to retrieve contents: ' + err)
            }else{
                res.render("community-home", {
                    account: user,
                    userid: user._id,
                    contents_data: contents,
                    // blogs: contents.blogs 
                })
            }
        })
    }else
        res.render("login")
}
