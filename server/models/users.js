//const db = require("mongoose")
const { Schema } = mongoose;

const schema = new Schema({
    email: String,
    password: String,
    role: String,
})

const user = mongoose.model('users', schema);

module.exports = user