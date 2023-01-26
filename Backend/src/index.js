const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
const collection = require("../models/mongodb_login.js")

const viewPath = path.join('../Frontend/views')

const cors = require('cors')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", viewPath)
app.use(express.urlencoded({extended : false}))

app.use(cors())
require('../routes/routes.route')(app)

app.listen(3000, ()=>{
    console.log("Port connected")
})