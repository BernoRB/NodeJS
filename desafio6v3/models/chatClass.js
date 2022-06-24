const path = require('path')

class Chat {
    constructor() {
        this.filename = path.join(__dirname, '..', 'data', 'messagesDB.json')
    }
}

module.exports = Chat