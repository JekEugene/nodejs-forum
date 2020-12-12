const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.homePage = function(req, res) {
    if(req.user){
        const user = req.user
        return res.status(200).json(user)
    } else {
        return res.status(200).json({name: "guest", role: 0})
    }
    
}

exports.login = async function(req, res){
    console.log("log1")
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email: email})
        console.log("log2")
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                const user = {
                    name: candidate.name,
                    id: candidate._id,
                    role: candidate.role
                }
                console.log("log3")
                const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
                const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
                console.log(accessToken)
                console.log(refreshToken)
                res.cookie("accessToken", `${accessToken}`,{maxAge: 1000 * 15, httpOnly: true})
                res.cookie("refreshToken", `${refreshToken}`, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true})
                
                User.findOne({_id: user.id}, async (err, findUser)=>{
                    findUser.token.push(refreshToken)
                    findUser.save()
                    console.log("log4")
                    return res.json(Object.assign(user, {msg: "", type: "hide"}))
                })
            } else {
                return res.status(403).json(Object.assign( req.user, {msg: "wrong email or password1", type: "error"}))
            }
        } else {
            return res.status(403).json(Object.assign( req.user, {msg: "wrong email or password2", type: "error"}))
        }
    } catch (e) {
        console.log(e)
    }
}

exports.register = async function(req, res){
    try {
        const {email, name, password} = req.body
        const user = await User.findOne({email: email})
        hashPassword = await bcrypt.hash(password, 10)
        if(user){
            return res.json(Object.assign( req.user, {msg: "user already exist", type: "error"}))
        }

        const newUser = new User({
            email,
            password: hashPassword,
            name,
            role: 1,
            rating: 0
        })
        newUser.save((err)=>{
            if(err) return res.status(200).json(Object.assign( req.user, {msg: "registration failed", type: "error"}))
            return res.json(Object.assign( req.user, {msg: "registration completed successfully", type: "success"}))
        })
    } catch (e) {
        return res.json(Object.assign( req.user, {msg: "error", type: "error"}))
    }    
}

exports.logout = async function(req, res){
    console.log("logout")
    const token = req.cookies.refreshToken
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
        if(err){
            return res.json({name: "guest", role: 0})
        }
        const userTokens = await User.find({_id: user.id})
        const tokens = userTokens.token
        tokens.filter((el)=>{
            if(token === el) return false
            return true
        })
        userTokens.token = tokens
        await userTokens.save()
        return res.json({name: "guest", role: 0})
    })
}