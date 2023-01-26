const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
const collection = require("../model/mongodb_login.js")

const viewPath = path.join('../Frontend/views')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", viewPath)
app.use(express.urlencoded({extended : false}))

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/home', (req, res) => {
    res.render("home")
})

app.post("/home", async (req, res) => {

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

})

app.post("/signup", async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    await collection.insertMany([data])
    console.log(data.email, "has signed up.")
    res.render("login")

})

app.get('*', (req, res) => {
    res.send("Error 404 : page not found")
})

app.listen(3000, ()=>{
    console.log("Port connected")
})