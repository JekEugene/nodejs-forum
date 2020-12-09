const jwt = require("jsonwebtoken")
const Token = require("../models/tokens")

module.exports = function(req, res, next) {
    console.log("1")
    if(req.redirect){
        console.log("2")
        const redirect = req.redirect
        const token = req.cookies.refreshToken
        jwt.verify(token, process.env.REFRESH_SECRET_TOKEN, async (err, user) => {
            if(err) return res.redirect("/")
            Token.findOne({user_id: user.id}, (err, userTokens)=>{
                if(err || userTokens===null){
                    console.log("3")
                    tokens = {
                        accessToken: '',
                        refreshToken: ''
                    }
                    req.redirect = ""
                    return res.status(200).json(Object.assign({role: 0, name: "guest"}, tokens))
                }
                console.log(user)
                if(userTokens.token.includes(token)) {
                    newUser = {
                        name: user.name,
                        id: user.id,
                        role: user.role
                    }
                    const accessToken = jwt.sign(newUser, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
                    const refreshToken = jwt.sign(newUser, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
                    const tokens = {
                        accessToken,
                        refreshToken
                    }
                    return res.json(Object.assign(user, tokens))
                } else {
                    console.log("5")
                    tokens = {
                        accessToken: '',
                        refreshToken: ''
                    }
                    res.status(403).json(Object.assign(user, tokens))
                }
            })
        })
    } else {
        next()
    }
}