module.exports = (app) => {
    const customer = require("../controllers/customer.controller.js")

    app.get('/', customer.index)
    app.post('/api/customer', customer.create)
    app.get('/api/customer', customer.findAll)
    app.get('/api/customer/:customerId', customer.findById)
    app.put('/api/customer/:customerId', customer.update)
    app.delete('/api/customer/:customerId', customer.delete)

}

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/home', (req, res) => {
    res.render("home")
})

app.post("/home", async (req, res) => {

    try{
        const check = await collection.findOne({email: req.body.email})

        if(check.password === req.body.password){
            console.log(req.body.email, "has logged in.")
            res.render("home")
        }else{
            res.send("wrong password, please try again")
        }
    }
    catch{
        res.send("Please sign-up")
    }

})

app.post("/signup", async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    await collection.insertMany([data])
    console.log(data.email, "has signed up.")
    res.render("login")

})

app.get('*', (req, res) => {
    res.send("Error 404 : page not found")
})