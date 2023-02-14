const posts = require("../models/mongodb_newpost.js")
const users = require("../models/mongodb_authen.js");
var session;

exports.profile = (req, res) => {
    res.render("profile")
}

exports.getUser_and_Posts = async (req, res) => {
    session = req.session

    try{
        const user = await users.findOne({email: session.userid})
        const blogs = await posts.findOne({user: session.userid})

        if(blogs.blogs.length != 0){
            console.log(blogs)
            res.render("profile", {account: user, userid: user._id, blogid: blogs._id, contents_data: blogs, noblog: true})
        }else{
            res.render("profile", {account: user, contents_data: blogs, userid: user._id, blogid: blogs._id, noblog: null})
        }
  
    }catch{
        res.send('Something went wrong')
    }

}

exports.deletePost = async (req, res) => {
    
    console.log(req.params._id)
    const userpostId = req.params.blogid
    const blogId = req.params._id
    
    const post = await posts.findOne({ _id: userpostId });
    
    if (!post) {
        console.log(`Post with id ${id} not found.`);
        return;
    }
    
    const result = await posts.updateOne({ _id: userpostId }, { $pull: { blogs: { _id: blogId } } });
    console.log(result);
      
    res.redirect("/profile/:userid")

}



