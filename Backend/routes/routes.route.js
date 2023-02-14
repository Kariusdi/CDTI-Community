module.exports = (app) => {
    const community = require("../controllers/home.controller")
    const authen = require("../controllers/authen.controller")
    const pagenotfound = require("../controllers/404.controller")
    const chat = require("../controllers/chat.controller")
    const post = require("../controllers/post.controller")
    const profile = require("../controllers/profile.controller")
    const editpost = require("../controllers/editpost.controller")
    // app.get('/login', authen.login)
    app.get('/', community.home)
    app.post('/', authen.initlogin)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('/logout', authen.logout)

    app.get('/post', post.post)
    app.post('/post-content', post.postcontent)

    app.get('/profile/:userid', profile.getUser_and_Posts)
    app.get('/edit/post/:blogid/:_id', editpost.editpost)

    app.post('/edited/:blogid/:_id', editpost.edited)
    app.post('/deletepost/:blogid/:_id', profile.deletePost)
    
    app.get('/chat', chat.chathome)

    app.get('*', pagenotfound.error)

}