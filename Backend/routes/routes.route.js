module.exports = (app) => {
    const authen = require("../controllers/authen.controller")
    const error = require("../controllers/404.controller")

    app.get('/', authen.index)
    app.post('/home', authen.login)
    app.get('/home', authen.home)
    app.post('/signup', authen.inituser)
    app.get('/signup', authen.signup)
    app.get('*', error.error)
}