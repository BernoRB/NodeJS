const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/desafio11users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const collection = "Users"

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    address: String,
    password: String,
    age: Number
})

const users = mongoose.model(collection, UserSchema)
module.exports = { users }