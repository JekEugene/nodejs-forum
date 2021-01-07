const jwt = require("jsonwebtoken")
const refreshToken = require("./refreshToken")

module.exports = function(req, res, next) {
    if (!req.cookies ) {
        req.user = {role: 0,
                    name: "guest"}
        next()
    } else {
        if (!req.cookies.accessToken) {
            if(req.cookies.refreshToken){
                return refreshToken(req, res, next)
            }
            req.user = {role: 0,
                        name: "guest"}
            next()
        } else {
            const token = req.cookies.accessToken
            jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
                if (err) {
                    refreshToken(req, res, next)
                } else {
                    req.user = user
                    next()
                }
            })
        }
    }
}