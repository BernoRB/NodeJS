require("dotenv").config()

const fastify = require('fastify')()
const app = fastify
app.register(require('./src/routes/productsF'), {prefix: '/productos'})

const connectMongo = require("./src/utils/connectMongo")

const persistence = process.env.PERSISTENCE || process.argv.slice(2)

if (persistence == 'MONGO') {
    const mongoDB = new connectMongo()
    mongoDB.init()
}

const PORT = process.env.PORT || 8080
app.listen({ port : PORT }, (err, adress) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server up ${adress}`)
})

module.exports = { app }