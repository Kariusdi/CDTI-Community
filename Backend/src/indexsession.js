const express = require("express")
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
const dbConfig = require("../config/authenDB.config")
const viewPath = path.join("../Frontend/views")
const sessions = require("express-session");
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.set("view engine", "hbs")
app.set("views", viewPath)

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
  secret: '1909802728861',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: oneDay 
  }
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(express.static(__dirname))

app.use(cookieParser())

var session;
username = "Karn"
password = "1234"

app.get('/home', (req, res) => {
    // session = req.session;
    console.log(req.session.userid)
    if(req.session.id){
        res.render("home")
    }else{
        
        res.render("login")
    }
})

app.post('/', (req, res) => {
    if(req.body.email == username && req.body.password == password){
        session = req.session
        session.id = req.body.email
        console.log(session.userid)
        res.render("home")
    }else{
        res.send("Invalid")
    }
})

app.get('/logout', function(req, res) {
  
  });

app.listen(3000, ()=>{
    console.log("Port connected")
})