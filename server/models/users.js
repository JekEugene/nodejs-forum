const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schema = new Schema({
    email: String,
    password: String,
    role: String,
    name: String,
    rating: Number,
})

const User = mongoose.model('users', schema);

module.exports = User