module.exports = (app) => {
    const authen = require("../controllers/authen.controller")
    const pagenotfound = require("../controllers/404.controller")
    const chat = require("../controllers/chat.controller")
    const post = require("../controllers/post.controller")
    const profile = require("../controllers/usersDB.controller")

    // app.get('/login', authen.login)
    app.get('/', authen.home)
    app.post('/', authen.initlogin)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('/logout', authen.logout)

    app.get('/post', post.post)
    app.post('/post-content', post.postcontent)

    app.get('/profile', profile.getUser_and_Posts)
    
    app.get('/chat', chat.chathome)

    app.get('*', pagenotfound.error)

}