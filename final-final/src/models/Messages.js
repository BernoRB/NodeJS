const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    date:{
        type: String
    },
    type:{
        type: String
    },
    body:{
        type: String
    }
})

const Messages = mongoose.model('Messages', MessagesSchema)
module.exports = { Messages }