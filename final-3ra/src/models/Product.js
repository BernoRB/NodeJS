const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    price:{
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    desc:{
        type: String,
        required: false,
    },
    thumbnail:{
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: false,
    },
    stock:{
        type: Number,
        required: false,
    }
})

const products = mongoose.model('Product', ProductSchema)
module.exports = { products }