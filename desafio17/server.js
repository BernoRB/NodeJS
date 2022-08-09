require("dotenv").config()
const express = require("express")
const connectMongo = require("./src/utils/connectMongo")

const app = express()
app.use(express.json())

const persistence = process.argv.slice(2) || process.env.PERSISTENCE

const productsRouter = require("./src/routes/products")
app.use("/productos", productsRouter)

if (persistence == 'MONGO') {
    const mongoDB = new connectMongo()
    mongoDB.init()
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})