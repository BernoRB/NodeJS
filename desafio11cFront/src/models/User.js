const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/desafio11users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const collection = "Users"

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const users = mongoose.model(collection, UserSchema)
module.exports = { users }