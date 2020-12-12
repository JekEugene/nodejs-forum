const Post = require("../models/posts")

exports.postPage = async function(req, res) {
    console.log("param "+req.params.id)
    const post = await Post.findOne({_id: req.params.id},(err)=>{if(err)console.log(err)})
    res.status(200).json(post)
}

exports.addPostPage = function(req, res) {

}

exports.getPosts = async function(req, res) {
    const posts = await Post.find((err)=>{
        if(err){
            console.log(err)
        }
    })
    posts.forEach((post)=>{
        post.text = post.text.slice(0, 500)
    })
    res.status(200).json(posts)
}

exports.addPost = async function(req, res) {
    console.log("role: "+req.user.role)
    if(req.user.role >= 1){
        const {title, text} = req.body
        Post.create({
            user_id: req.user.id,
            user_name: req.user.name,
            title,
            text,
            comments: 0,
            likes: 0,
            dislikes: 0,
            date: Date.now(),
        }, (err)=>{
            if(err){
                return res.status(400).json(Object.assign({msg: "post not created", type: "success"}))
            }
            res.status(200).json(Object.assign({msg: "Post created", type: "success"}))
        })
    } else {
        res.status(403).json(Object.assign({msg: "You are not logged in", type: "error"}))
    }
    
}

exports.getComments = async function(req, res) {
    console.log("param "+req.params.id)
    const post = await Post.findOne({_id: req.params.id},(err)=>{if(err)console.log(err)})
    res.status(200).json(post)
}

exports.deletePost = function(req, res) {
    
}

exports.addComment = function(req, res) {
    
}

exports.deleteComment = function(req, res) {
    
}