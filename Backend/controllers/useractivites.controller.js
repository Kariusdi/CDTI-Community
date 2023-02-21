const posts = require("../models/mongodb_newpost.js")
const users = require("../models/mongodb_authen.js");
var session;

const admin = require("firebase-admin");
const serviceAccount = require("../path/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "cdti-board.appspot.com"
});


exports.profile = (req, res) => {
    res.render("profile")
}

exports.getUser_and_Posts = async (req, res) => {
    session = req.session

    try{
        const user = await users.findOne({email: session.userid})
        const post = await posts.findOne({user: session.userid})
        
        if(post){
            res.render("profile", {account: user, userid: user._id, blogid: post._id, contents_data: post.blogs.reverse(), noblog: true})
        }else{
            res.render("profile", {account: user, userid: user._id, noblog: null})
        }
  
    }catch{
        res.send('Something went wrong')
    }

}

exports.post = async (req, res) => {
    session = req.session

    try{
        const user = await users.findOne({email: session.userid})

        res.render("post" , {account: user})
  
    }catch{
        res.send('Something went wrong')
    }

}

exports.postcontent = async (req, res) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let dateformat = year + "-" + month + "-" + date
    let timeformt = hours + ":" + minutes + ":" + seconds

    session = req.session

    try{
        const check_user = await users.findOne({email: session.userid})
        const check_posts = await posts.findOne({user: session.userid})

        var name;
        var avatar;
        const user = session.userid

        console.log(req.body.anonymous)

        if(req.body.anonymous == "anonymous") {
            name = "anonymous"
            avatar = "https://sv1.picz.in.th/images/2023/02/15/L6B2Xu.png"
        }else{
            name = check_user.name
            avatar = check_user.avatar
        }

        const blogs = [{
            "avatar": avatar,
            "name": name,
            "content": req.body.content,
            "img": req.body.imageUrl,
            "date": dateformat,
            "time": timeformt,
        }]

        if(req.body.content != ''){
            // console.log(check_posts)
            if(check_posts == null){
                const post = await posts({
                    user,
                    blogs,
                })
                await post.save()  
            }else{
                await posts.findOneAndUpdate(
                    {
                        user: user,
                    },
                    {
                        $addToSet: {
                            blogs: blogs,
                        },
                    }
                )
            }
            res.redirect("/")
        }
        else{
            res.send('Content is empty')
        }
        
    }catch{
        res.send('Something went wrong')
    }

}

exports.editpost = async (req, res) => {
    session = req.session
    // console.log(req.params.blogid)
    // console.log(req.params._id)

    const post = await posts.findOne(
        { "_id": req.params.blogid, "blogs._id": req.params._id },
        { "blogs.$": 1 }
    );

    console.log("========", post, post.blogs, post.blogs.name)

    res.render("editpost" , {userid: session.userid, _id: req.params.blogid, blogid: req.params._id, contents_data: post})
}

exports.edited = async (req, res) => {
    console.log(req.params._id)
    const blogId = req.params.blogid
    const userpostId = req.params._id
    
    const check_user = await users.findOne({email: session.userid})
    const post = await posts.findOne({ _id: userpostId });

    const name = check_user.name
    
    if (!post) {
        console.log(`Post with id ${userpostId} not found.`);
        return;
    }else{
        console.log(`Post with id ${userpostId} be found.`);
    }

    const result = await posts.updateOne(
        { "_id": userpostId, "blogs._id": blogId },
        { $set: { "blogs.$.content": req.body.content } }
      );
    
    console.log(result);
      
    res.redirect("/profile/:userid")
}

exports.deletePost = async (req, res) => {
    
    var userpostId = req.params.blogid
    var blogId = req.params._id
    var post = await posts.findOne({ _id: userpostId });
    
    
    if (!post) {
        console.log(`Post with id ${id} not found.`);
        return;
    }

    console.log(post)
    console.log(userpostId, blogId)

    try {
        if(post.blogs.length > 1){
            console.log(userpostId, blogId)
            const result = await posts.updateOne(
                { _id: userpostId }, 
                { $pull: { blogs: { _id: blogId } } 
            });
            console.log(result)
        }else{
            posts.findByIdAndDelete(userpostId).then(data => {
                if(!data){
                    return res.status(404).json({
                        msg: "Not found Record : " + req.params.customerId
                    })
                }
            }).catch(err => {
                return res.status(500).json({
                    msg: "Can't delete data cause by : " + err.message
                })
            })
        }
        res.redirect("/profile/:userid")
    } catch (error) {
        res.send("Error deleteing")
    }

}

exports.comment = async (req, res) => {

    session = req.session

    const blogId = req.params.blogid
    const userpostId = req.params._id
    var post = await posts.findOne({ user: session.userid});

    console.log("--------", post)
    
    if (!post) {
        console.log(`Post with id ${id} not found.`);
        return;
    }
    
    const comment = [{
        "avatar": "Test.jpg",
        "name": "Test",
        "conment": "Test 123",
    }]

    res.redirect('/')

    // await posts.updateOne(
    //     { "_id": blogId, "blogs._id": userpostId },
    //     { $push: { "blogs.$.comments": comment } },
    // ); 
}
