const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schema = new Schema({
    email: String,
    password: String,
    role: Number,
    name: String,
    date: Date,
    token: [String]
})

const User = mongoose.model('users', schema);

module.exports = User