const jwt = require("jsonwebtoken")
const User = require("../models/users")

module.exports = function(req, res, next) {
    const token = req.cookies.refreshToken
    jwt.verify(token, process.env.REFRESH_SECRET_TOKEN, async (err, user) => {
        if(err) return res.json({role: 0, name: "guest"})
        const userTokens = await User.findById(user.id)
        if(userTokens===null){
            console.log("1")
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            return res.status(401).json(Object.assign({role: 0, name: "guest"}))
        }
        console.log("usertokens: "+userTokens.token+"  :token:  "+token)
        if(userTokens.token.includes(token)) {
            console.log("2")
            const refreshUser = {
                id: user.id,
                name: user.name,
                role: user.role
            }
            const accessToken = jwt.sign(refreshUser, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
            const refreshToken = jwt.sign(refreshUser, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
            res.cookie("accessToken", `${accessToken}`,{maxAge: 1000 * 15, httpOnly: true})
            res.cookie("refreshToken", `${refreshToken}`, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true})
            // let usertokens = userTokens.token
            // usertokens = usertokens.filter((tok)=>{
            //     if(tok === token)
            //         return true
            //     return false
            // })
            // usertokens.push(refreshToken)
            // let userUpdate = await User.findByIdAndUpdate(user.id)
            // userUpdate.token = usertokens
            // await userUpdate.save()
            req.user = refreshUser
            next()
        } else {
            console.log("3")
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            return res.status(403).json(Object.assign({name: "guest", role: 0}))
        }
    })
}