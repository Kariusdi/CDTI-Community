const collection = require("../models/mongodb_login.js")

exports.index = (req, res) => {
    res.render("login")
}

exports.signup = (req, res) => {
    res.render("signup")
}

exports.home = (req, res) => {
    res.render("home")
}

exports.inituser = async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    await collection.insertMany([data])
    console.log(data.email, "has signed up.")
    res.render("login")

}

exports.login = async (req, res) => {

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.password === req.body.password){
            console.log(req.body.email, "has logged in.")
            res.render("home")
        }else{
            res.send("wrong password, please try again")
        }
    }
    catch{
        res.send("Please sign-up")
    }

}