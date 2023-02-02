module.exports = (app) => {
    const authen = require("../controllers/authen.controller")
    const pagenotfound = require("../controllers/404.controller")
    const chat = require("../controllers/chat.controller")
    const community = require("../controllers/commu.controller")

    app.get('/login', authen.login)
    app.get('/', authen.home)
    app.post('/', authen.initlogin)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('/logout', authen.logout)

    app.get('/chat', chat.chathome)
    app.get('/community', community.communityhome)
    app.get('*', pagenotfound.error)
}