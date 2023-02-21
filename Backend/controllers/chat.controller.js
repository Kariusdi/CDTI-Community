const users = require("../models/mongodb_authen.js")
var session;

exports.chathome = async (req, res) => {
    session = req.session
    const user = await users.findOne({email: session.userid})
    res.render("chat", {userid: user._id})
}