const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {

    if (!req.cookies ) {
        req.user = {role: 0,
                    name: "guest"}
        next()
    } else {
        if (!req.cookies.accessToken) {
            req.user = {role: 0,
                        name: "guest"}
            next()
        } else {
            const token = req.cookies.accessToken
            jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
                if (err) {
                    console.log("arrr: ")
                    req.redirect = req.url
                    next()
                    //res.redirect("/token")
                } else {
                    req.user = user
                    console.log("user: "+user.name)
                    next()
                }
            })
        }
    }
}