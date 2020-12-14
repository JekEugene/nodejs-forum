const mongoose = require("mongoose")
const { Schema } = require("mongoose")
ObjectId = Schema.Types.ObjectId

const schema = new Schema({
    post_id: ObjectId,
    user_id: ObjectId,
    user_name: String,
    text: String,
    date: Date,
})

const Comment = mongoose.model('comments', schema);

module.exports = Comment