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

app.use(express.static(path.join("../Frontend")));
// app.use(express.static('public'));


app.use(cookieParser())

app.use(cors())
require('../routes/routes.route')(app)

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url).then(() => {
    console.log('Connected to MongoDB')
}).catch(err=>{
    console.log('Cannot Connect to MongoDB')
    process.exit()
})

app.listen(3000, ()=>{
    console.log("Port connected")
})