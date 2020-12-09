const mongoose = require("mongoose")
const { Schema } = require("mongoose")
ObjectId = Schema.Types.ObjectId

const schema = new Schema({
    user_id: ObjectId,
    token: [String]
})

const Token = mongoose.model('tokens', schema);

module.exports = Token