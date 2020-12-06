const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    const auth = req.headers["authorization"]
    const token = auth && auth.split(' ')[1]
    console.log(token)
    if (token === undefined) {
        req.user = { role: 0 }
        next()
    } else {
        console.log("wtf")
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
}