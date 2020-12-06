//const db = require("mongoose")
const { Schema } = mongoose;
ObjectId = Schema.Types.ObjectId

const schema = new mongoose.schema({
    user_id: ObjectId,
    title: String,
    text: String,
    comments: Number,
    likes: Number,
    dislikes: Number,
    date: Date,
})

const comment = mongoose.model('comments', schema);

module.exports = comment