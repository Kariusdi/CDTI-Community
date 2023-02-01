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
        res.render("home", {username: check.username})
    }else
    res.render("login")
    
    
}

exports.inituser = async (req, res) => {

    const data = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.username === req.body.name){
            res.send("Already used this username, please change.")
        }

        if(check.email === req.body.email){
            res.send("Already signed up with this email, please change.")
        }
        
    }catch{
        await collection.insertMany([data])
        console.log(data.email, "has signed up.")
        res.render("login")
    }

    

}

exports.initlogin = async (req, res) => {

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.password === req.body.password){
            session = req.session
            session.userid = req.body.email
            console.log(req.body.email, "has logged in.")
            console.log(check.username)
            console.log(req.session)
            res.render("home", {username: check.username})
        }else{
            res.send("Invalid, username or password.")
        }

        
    }
    catch{
        res.send("Please sign-up")
    }

}

exports.logout = (req, res) => {
    req.session.destroy()
    console.log(req.session)
    res.redirect('/')
}