const users = require("../models/mongodb_authen.js")
const posts = require("../models/mongodb_newpost.js")
const admins = require("../models/mongodb_admin")
var session;

exports.home = async (req, res) => {

    session = req.session

    if(session.userid){
        const user = await users.findOne({email: session.userid})

        if(user){
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{

                    contents_sorted = sort_content(contents, "public")
    
                    res.render("community-home", {
                        account: user,
                        userid: user._id,
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }else{
            const admin = await admins.findOne({name: session.userid})
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{

                    contents_sorted = sort_content(contents, "public")
    
                    res.render("community-home", {
                        account: admin,
                        admin: "admin",
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }

        
    }else
        res.render("login")
}


exports.CPEhome = async (req, res) => {

    session = req.session

    if(session.userid){
        const user = await users.findOne({email: session.userid})

        if(user){
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{

                    contents_sorted = sort_content(contents, "CPE")
    
                    res.render("CPE", {
                        account: user,
                        userid: user._id,
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }else{
            const admin = await admins.findOne({name: session.userid})
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{
    
                    contents_sorted = sort_content(contents, "CPE")
    
                    res.render("CPE", {
                        account: admin,
                        admin: "admin",
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }

        
    }else
        res.render("login")
}

exports.DDThome = async (req, res) => {
    session = req.session

    if(session.userid){
        const user = await users.findOne({email: session.userid})

        if(user){
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{

                    contents_sorted = sort_content(contents, "DDT")
    
                    res.render("DDT", {
                        account: user,
                        userid: user._id,
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }else{
            const admin = await admins.findOne({name: session.userid})
            posts.find((err, contents) => {
                if(err) {
                    console.log('Failed to retrieve contents: ' + err)
                }else{

                    contents_sorted = sort_content(contents, "DDT")
    
                    res.render("DDT", {
                        account: admin,
                        admin: "admin",
                        contents_data: contents_sorted.reverse(),
                    })
                }
            })
        }

        
    }else
        res.render("login")
}

function sort_content(contents, page) {
    var contents_sorted = []
                
    for (var contents_data of contents) {
        // console.log(contents_data);
        for (var blogs of contents_data.blogs) {
            // console.log(blogs);
            if(blogs.postTo == page){
                contents_sorted.push(blogs)
            }
        }
    }

    contents_sorted.sort((a, b) => {
        const dateComparison = a.postDate.localeCompare(b.postDate);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return a.time.localeCompare(b.time);
    });

    return contents_sorted
}