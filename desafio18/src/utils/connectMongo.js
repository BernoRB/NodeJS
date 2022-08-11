const mongoose = require("mongoose")
const mongoUri = process.env.MONGO_URI

class connectMongo {

    constructor() {
        this.connected = true
        this.client = mongoose
    }

    init() {
        try {
            this.client.connect(mongoUri), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
            console.log('Persistencia: MONGO DB')
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = connectMongo