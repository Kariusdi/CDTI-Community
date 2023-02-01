const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const redis = require('connect-redis');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const redisClient = require('redis').createClient({
    legacyMode:true
});
redisClient.connect().catch(console.log);

const RedisStore = redis(session);

app.use(
    session({
        store:new RedisStore({client:redisClient}),
        secret: "my_session_secret", 
        resave: false, 
        saveUninitialized: false, 
        cookie:{
            // Only set to true if you are using HTTPS.
            // Secure Set-Cookie attribute.
            secure:true, 
            // Only set to true if you are using HTTPS.
            httpOnly:false,
            // Session max age in milliseconds. (1 min)
            // Calculates the Expires Set-Cookie attribute
            maxAge:60000
        } 
    })
);

app.get("/",(req,res) => {
    return res.json({
        "message": "Hello World!",
        "success":true
    })
})

app.listen(PORT, async () => {
    mongoose.connect("mongodb://localhost:27017/session_app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        () => console.log(`App listening on port ${PORT}`)
    ).catch(console.error);    
});
