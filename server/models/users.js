const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schema = new Schema({
    email: String,
    password: String,
    role: String,
    name: String,
    rating: Number,
    token: [String]
})

const User = mongoose.model('users', schema);

module.exports = User