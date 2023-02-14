const posts = require("../models/mongodb_newpost.js")
const users = require("../models/mongodb_authen.js")
var session;

exports.post = (req, res) => {
    session = req.session
    res.render("post" , {userid: session.userid})
}

exports.postcontent = async (req, res) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timeformat = year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds

    session = req.session

    try{
        const check_user = await users.findOne({email: session.userid})
        const check_posts = await posts.findOne({user: session.userid})

        const name = check_user.name
        const user = session.userid

        const blogs = [{
            "name": name,
            "content": req.body.content,
            "img": "none",
            "time": timeformat
        }]

        if(req.body.content != ''){
            console.log(check_posts)
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


