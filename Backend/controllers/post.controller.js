const posts = require("../models/mongodb_post.js")
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
        const check = await users.findOne({email: session.userid})
        const name = check.name
        const content = req.body.content
        const time = timeformat

        console.log(content)

        if(content != ''){
            const post = await posts({
                name,
                content,
                time,})
            await post.save()    

            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{
                    res.redirect("/")
                }
            })
        }
        else{
            res.send('Cant store data')
        }
        
    }catch{
        res.send('Something went wrong')
    }

}
