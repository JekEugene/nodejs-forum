const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Token = require("../models/tokens")


exports.homePage = function(req, res) {
    const user = req.user
    console.log("hi")
    res.status(200).json(user)
}

exports.refreshToken = function(req, res) {
    console.log("1")
    if(req.redirect){
        console.log("2")
        const token = req.cookies.refreshToken
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
            if(err) return res.redirect("/")
            const userTokens = await Token.findOne({id: user.id})
            if(userTokens.token.includes(token)) {
                const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
                const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
                const tokens = {
                    accessToken,
                    refreshToken
                }
                return res.json(Object.assign(user, tokens))
            } else {
                console.log("3")
                tokens = {
                    accessToken: '',
                    refreshToken: ''
                }
                res.status(403).json(Object.assign(user, tokens))
            }
        })
    } else {
        console.log("4")
        res.redirect("/")
    }
}

exports.login = async function(req, res){
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email: email})
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                const user = {
                    name: candidate.name,
                    id: candidate._id,
                    role: candidate.role
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" })
                const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" })
                //{ maxAge: 900000, httpOnly: true }
                const tokens = {
                    accessToken,
                    refreshToken
                }
                
                Token.findOne({user_id: user.id}, async (err, findUser)=>{
                    if(findUser===null){
                        const newUser = await Token.create({user_id: user.id})
                        newUser.token.push(refreshToken)
                        newUser.save()
                        return res.json(Object.assign(user, tokens, {msg: "", type: "hide"}))
                    }
                    findUser.token.push(refreshToken)
                    findUser.save()
                    return res.json(Object.assign(user, tokens, {msg: "", type: "hide"}))
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
    const token = req.cookies.refreshToken
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
        if(err){
            return res.json({name: "guest", role: 0})
        }
        user.token.filter((el)=>{
            if(token === el) return false
            return true
        })
        return res.json({name: "guest", role: 0})
    })
}