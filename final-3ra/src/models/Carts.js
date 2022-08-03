const mongoose = require('mongoose')

const CartsSchema = new mongoose.Schema({
    email:{
        type: String,
        required: false,
    },
    date:{
        type: String,
        required: false,
    },
    products:{
        type: Array,
        "default": [],
    },
    address:{
        type: String,
        required: false,
    }
})

const Carts = mongoose.model('Carts', CartsSchema)
module.exports = { Carts }