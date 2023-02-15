const posts = require("../models/mongodb_newpost.js")
const users = require("../models/mongodb_authen.js")
var session;


exports.editpost = async (req, res) => {
    session = req.session
    console.log(req.params.blogid)
    console.log(req.params._id)
    // const post = await posts.find({
    //     _id: req.params.blogid,
    //     blogs: [
    //         {
    //             _id: req.params._id
    //         }
    //     ]
    // });
    const post = await posts.findOne(
        { "_id": req.params.blogid, "blogs._id": req.params._id },
        { "blogs.$": 1 }
    );
      
    // const post = await posts.findOne({ _id: req.params.blogid });
    console.log("-----", post)
    res.render("editpost" , {userid: session.userid, userpostId: req.params.blogid, blogId: req.params._id, contents_data: post})
}

exports.edited = async (req, res) => {
    console.log(req.params._id)
    const userpostId = req.params.blogid
    const blogId = req.params._id

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timeformat = year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds
    
    const check_user = await users.findOne({email: session.userid})
    const post = await posts.findOne({ _id: userpostId });

    const name = check_user.name
    
    if (!post) {
        console.log(`Post with id ${id} not found.`);
        return;
    }
    
    const result = await posts.update({ _id: userpostId }, 
        { $set: { 
            blogs: { 
                _id: blogId,
                name: name,
                content: req.body.content,
                img: "none",
                time: timeformat, 
            } 
        } });
    console.log(result);
      
    res.redirect("/profile/:userid")
}