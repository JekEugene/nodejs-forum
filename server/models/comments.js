const mongoose = require("mongoose")
const { Schema } = require("mongoose")
ObjectId = Schema.Types.ObjectId

const schema = new Schema({
    user_id: ObjectId,
    post_id: ObjectId,
    title: String,
    text: String,
    likes: Number,
    dislikes: Number,
    date: Date,
})

const comment = mongoose.model('comments', schema);

module.exports = comment