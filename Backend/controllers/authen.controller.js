const users = require("../models/mongodb_authen.js")
var session;

exports.login = (req, res) => {
    res.render("login")
}

exports.signup = (req, res) => {
    res.render("signup")
}

exports.inituser = async (req, res) => {

    const data = {name, department, email, password, avatar} = req.body;

    try{
        const check_user = await users.findOne({email: email})
        const regex = /^\d+@cdti+\.ac.th$/;

        if(!regex.test(email)){
            res.render("signup", {error_msg: "Please use CDTI email."})
        }
        else if(check_user == null && name != '' && email != '' && password != '' && regex.test(email)){
            const user = await users({
                name,
                department,
                email,
                password,
                avatar,
            })
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
        const user = await users.findOne({email: req.body.email})

        const isMatched = await user.comparePassword(req.body.password);

        if(isMatched && user.email == req.body.email){
            session = req.session
            session.userid = req.body.email
            console.log(req.body.email, "has logged in.")
            // console.log(check.name)
            // console.log(req.session)
            // console.log(session.userid)
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