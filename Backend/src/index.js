const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
const collection = require("../models/mongodb_authen.js")
const dbConfig = require("../config/authenDB.config")
const viewPath = path.join('../Frontend/views')
const session = require('express-session');
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.set("view engine", "hbs")
app.set("views", viewPath)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cors())
require('../routes/routes.route')(app)

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url).then(() => {
    console.log('Connect to MongoDB')
}).catch(err=>{
    console.log('Cannot Connect to MongoDB')
    process.exit()
})

app.listen(3000, ()=>{
    console.log("Port connected")
})