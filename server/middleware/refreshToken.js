const jwt = require("jsonwebtoken")
const User = require("../models/users")

module.exports = function(req, res, next) {
    console.log("red")
    const token = req.cookies.refreshToken
    jwt.verify(token, process.env.REFRESH_SECRET_TOKEN, async (err, user) => {
        if(err) return res.json({role: 0, name: "guest"})
        User.findOne({_id: user.id}, (err, userTokens)=>{
            if(err || userTokens===null){
                res.clearCookie("accessToken")
                res.clearCookie("refreshToken")
                return res.status(401).json(Object.assign({role: 0, name: "guest"}, tokens))
            }
            if(userTokens.token.includes(token)) {
                const refreshUser = {
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
                const accessToken = jwt.sign(refreshUser, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
                const refreshToken = jwt.sign(refreshUser, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
                console.log("bang1")
                res.cookie("accessToken", `${accessToken}`)
                res.cookie("refreshToken", `${refreshToken}`)
                req.user = refreshUser
                console.log("bang2")
                next()
            } else {
                res.clearCookie("accessToken")
                res.clearCookie("refreshToken")
                return res.status(403).json(Object.assign({name: "guest", role: 0}))
            }
        })
    })
}