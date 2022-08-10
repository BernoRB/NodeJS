const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
    
    orderNumber: {
        type: Number,
        required: true
    },
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
    status:{
        type: String,
        "default": 'Generada'
    }
})

const Orders = mongoose.model('Orders', OrdersSchema)
module.exports = { Orders }