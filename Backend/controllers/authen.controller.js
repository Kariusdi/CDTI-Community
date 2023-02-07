const users = require("../models/mongodb_authen.js")
const posts = require("../models/mongodb_post.js")
var session;

exports.login = (req, res) => {
    res.render("login")
}

exports.signup = (req, res) => {
    res.render("signup")
}

exports.home = async (req, res) => {

    session = req.session

    if(session.userid){
        const check = await users.findOne({email: session.userid})

        posts.find((err, contents) => {
            if(err) {
                console.log('Failed to retrieve contents: ' + err)
            }else{
                res.render("community-home", {
                    username: check.name,
                    userid: session.userid,
                    contents_data: contents,
                })
            }
        })

        // res.render("community-home", {username: check.name, userid: session.userid})
    }else
    res.render("login")
    
}

exports.inituser = async (req, res) => {

    const data = {name, email, password} = req.body;
    // console.log(name.toLowerCase(), email, password)

    try{
        const check = await users.findOne({email: email})
        if(check == null && name != '' && email != '' && password != ''){
            const user = await users({
                name,
                email,
                password,})
            await user.save()    
        
            console.log(data.email, "has signed up.")
            res.render("login")

        }else if(name == '' || email == '' || password == ''){
            res.render("signup", {error_msg: "You are missing some information, please fill up all."})
            // res.send("You may be missing some information, please fill up all.")
        }
        else{
            res.render("signup", {error_msg: "Username or email has been used, try again."})
        }
        
    }catch{
        res.send("Error session.")
    }

}

exports.initlogin = async (req, res) => {

    try{
        const check = await users.findOne({email: req.body.email})

        const isMatched = await check.comparePassword(req.body.password);

        if(isMatched && check.email == req.body.email){
            session = req.session
            session.userid = req.body.email
            console.log(req.body.email, "has logged in.")
            // console.log(check.name)
            console.log(req.session)
            console.log(session.userid)
            res.redirect('/')
        }else{
            res.render("login", {error_msg: "Email or password is incorrect, please try again."})
        }

        
    }
    catch{
        res.render("login", {error_msg: "Invalid, username or password."})
    }

}

exports.logout = (req, res) => {
    // await users("useraccounts").insertOne(req.session.cookie._expires.toString())
    req.session.destroy()
    console.log(req.session)
    res.redirect('/')
}