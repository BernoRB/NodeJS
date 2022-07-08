const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    id: Number,
    timestamp: String,
    title: String,
    desc: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
})


const productsModel = mongoose.model('products', productsSchema)
module.exports = productsModel