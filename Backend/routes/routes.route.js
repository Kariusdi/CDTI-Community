module.exports = (app) => {
    const community = require("../controllers/home.controller")
    const authen = require("../controllers/authen.controller")
    const pagenotfound = require("../controllers/404.controller")
    const chat = require("../controllers/chat.controller")
    const user_activities = require("../controllers/useractivites.controller")
    // app.get('/login', authen.login)
    app.get('/', community.home)
    app.post('/', authen.initlogin)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('/logout', authen.logout)

    app.get('/post', user_activities.post)
    app.post('/post-content', user_activities.postcontent)

    app.get('/profile/:userid', user_activities.getUser_and_Posts)
    app.get('/edit/post/:blogid/:_id', user_activities.editpost)

    app.post('/edited/:blogid/:_id', user_activities.edited)
    app.post('/deletepost/:blogid/:_id', user_activities.deletePost)

    app.post('/comment', user_activities.comment)
    
    app.get('/chat', chat.chathome)

    app.get('*', pagenotfound.error)

}