const collection = require("../models/mongodb_authen.js")
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
        const check = await collection.findOne({email: session.userid})
        res.render("home", {username: check.name, userid: session.userid})
    }else
    res.render("login")
    
}

exports.inituser = async (req, res) => {

    const data = {name, email, password } = req.body;
    // console.log(name.toLowerCase(), email, password)

    try{
        const check = await collection.findOne({email: email})
        if(check == null && name != '' && email != '' && password != ''){
            const user = await collection({
                name,
                email,
                password,})
            await user.save()    
        
            console.log(data.email, "has signed up.")
            res.render("login")

        }else if(name == '' || email == '' || password == ''){
            res.render("signup", {error_msg: "You may be missing some information, please fill up all."})
            // res.send("You may be missing some information, please fill up all.")
        }
        else{
            res.render("signup", {error_msg: "Username or password has been used, please try again."})
        }
        
    }catch{
        res.send("Error session.")
    }

}

exports.initlogin = async (req, res) => {

    try{
        const check = await collection.findOne({email: req.body.email})

        const isMatch = await check.comparePassword(req.body.password);

        if(isMatch && check.email == req.body.email){
            session = req.session
            session.userid = req.body.email
            console.log(req.body.email, "has logged in.")
            // console.log(check.name)
            console.log(req.session)
            // console.log(req.session.cookie._expires.toString())
            res.render("home", {username: check.name, userid: session.userid})
        }else{
            res.render("login", {error_msg: "Email or password is incorrect, please try again."})
        }

        
    }
    catch{
        res.render("login", {error_msg: "Invalid, username or password."})
    }

}

exports.logout = (req, res) => {
    // await collection("useraccounts").insertOne(req.session.cookie._expires.toString())
    req.session.destroy()
    console.log(req.session)
    res.redirect('/')
}