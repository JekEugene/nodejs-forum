const Post = require("../models/posts")
const Comment = require("../models/comments")

exports.postPage = async function(req, res) {
    const post = await Post.findById(req.params.id, (err)=>{if(err)console.log(err)})
    res.status(200).json(post)
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
    const comments = await Comment.find({post_id: req.params.id},(err)=>{if(err)console.log(err)})
    res.status(200).json(comments)
}

exports.addComment = function(req, res) {
    if(req.user.role >= 1){
        const {commentText, post_id} = req.body
        Comment.create({
            post_id,
            user_id: req.user.id,
            user_name: req.user.name,
            text: commentText,
            likes: 0,
            dislikes: 0,
            date: Date.now(),
        })
        res.status(200).json({msg: "the comment was sent", type: "success"})
    } else {
        res.status(403).json({msg: "You don't have permission to send comment", type: "error"})
    }
    
}

exports.deleteComment = async function(req, res) {
    const comment_id = req.body.comment_id
    const comment = await Comment.findOne({_id: comment_id})
    if(comment.user_id == req.user.id || req.user.role == 2){
        await Comment.deleteOne({_id: comment_id})
        return res.status(200).json({msg: "Comment deleted", type: "success"})
    } else {
        return res.status(403).json({msg: "Cannot delete comment", type: "error"})
    }
}

exports.deletePost = async function(req, res) {
    const post_id = req.body.post_id
    const post = await Post.findOne({_id: post_id})
    if(post.user_id == req.user.id || req.user.role == 2){
        await Post.deleteOne({_id: post_id})
        return res.status(200).json({msg: "Post deleted", type: "success"})
    } else {
        return res.status(403).json({msg: "Cannot delete post", type: "error"})
    }
}