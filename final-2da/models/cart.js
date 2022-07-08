const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema({
    id: Number,
    timestamp: String,
    products: Object // ojota esto puede no funcionar
})

const cartsModel = mongoose.model('carts', cartsSchema)
module.exports = cartsModel