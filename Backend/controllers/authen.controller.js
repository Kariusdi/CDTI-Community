const collection = require("../models/mongodb_authen.js")
const express = require("express")
const app = express()
const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

exports.index = (req, res) => {
    res.render("login")
}

exports.signup = (req, res) => {
    res.render("signup")
}

exports.home = (req, res) => {
    res.render("home", {userId: req.session.userId})
}

exports.inituser = async (req, res) => {

    const data = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.email === req.body.email){
            res.send("You already signed up with this email.")
        }
        
    }catch{
        await collection.insertMany([data])
        console.log(data.email, "has signed up.")
        res.render("login")
    }

    

}

exports.login = async (req, res) => {

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.password === req.body.password){
           
            console.log(req.body.email, "has logged in.")
            console.log(check.username)
            res.render("home", {username: check.username})
        }else{
            res.send("wrong password, please try again")
        }

        
    }
    catch{
        res.send("Please sign-up")
    }

}
