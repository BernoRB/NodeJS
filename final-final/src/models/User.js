const mongoose = require('mongoose')
const collection = "Users"

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    address: String,
    age: Number,
    phone: String,
    avatar: String
})

const users = mongoose.model(collection, UserSchema)
module.exports = { users }