const jwt = require("jsonwebtoken")
const refreshToken = require("./refreshToken")

module.exports = function(req, res, next) {
    console.log("acc "+req.cookies.accessToken)
    console.log("ref "+req.cookies.refreshToken)
    if (!req.cookies ) {
        req.user = {role: 0,
                    name: "guest"}
                    console.log("send1")
        next()
    } else {
        if (!req.cookies.accessToken) {
            if(req.cookies.refreshToken){
                console.log("send2")
                return refreshToken(req, res, next)
            }
            console.log("send3")
            req.user = {role: 0,
                        name: "guest"}
            next()
        } else {
            const token = req.cookies.accessToken
            jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
                if (err) {
                    console.log("send4")
                    refreshToken(req, res, next)
                } else {
                    console.log("send5")
                    req.user = user
                    next()
                }
            })
        }
    }
}