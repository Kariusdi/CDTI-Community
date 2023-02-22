const users = require("../models/mongodb_authen.js")
const posts = require("../models/mongodb_newpost.js")
var session;

exports.home = async (req, res) => {

    session = req.session

    if(session.userid){
        const user = await users.findOne({email: session.userid})

        posts.find((err, contents) => {
            if(err) {
                console.log('Failed to retrieve contents: ' + err)
            }else{

                var contents_sorted = []
            
                for (var contents_data of contents) {
                    // console.log(contents_data);
                    for (var blogs of contents_data.blogs) {
                        // console.log(blogs);
                        contents_sorted.push(blogs)
                    }
                }

                contents_sorted.sort((a, b) => {
                    const dateComparison = a.date.localeCompare(b.date);
                    if (dateComparison !== 0) {
                      return dateComparison;
                    }
                    return a.time.localeCompare(b.time);
                });

                res.render("community-home", {
                    account: user,
                    userid: user._id,
                    contents_data: contents_sorted.reverse(),
                })
            }
        })
    }else
        res.render("login")
}


exports.CPEhome = (req, res) => {
    res.render('CPE')
}

exports.DDThome = (req, res) => {
    res.render('DDT')
}