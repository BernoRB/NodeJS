const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema({
    id: Number,
    timestamp: String,
    products: { type : Array, "default" : [] }
})

const cartsModel = mongoose.model('carts', cartsSchema)
module.exports = cartsModel