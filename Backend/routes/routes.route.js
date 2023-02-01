module.exports = (app) => {
    const authen = require("../controllers/authen.controller")
    const error = require("../controllers/404.controller")

    app.get('/login', authen.login)
    app.post('/', authen.initlogin)
    app.get('/', authen.home)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('*', error.error)
}