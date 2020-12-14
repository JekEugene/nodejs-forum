const User = require("../models/users")
const Post = require("../models/posts")

exports.UserPage = async function(req, res) {
    const user = await User.findById(req.params.id)
    const sendUser = {
        id: user._id,
        name: user.name,
        date: user.date
    }
    res.status(200).json(sendUser)
}

exports.GetUserPosts = async function(req, res) {
    const {user_id} = req.body
    let posts = await Post.find({user_id})
    posts.forEach((post)=>{
        post.text = post.text.slice(0,500)
    })
    posts.sort((a, b)=>{
        if(a.date > b.date)
            return -1
        if(a.date < b.date)
            return 1
        return 0
    })
    posts = posts.slice(0,5)
    res.status(200).json(posts)
}