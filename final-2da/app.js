const express = require('express')
const path = require('path')
const http = require('http')
require("dotenv").config()

const products = require('./routes/productsRou')
const cart = require('./routes/cartRou')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/carrito', cart)
app.use('/api/productos', products)
app.use((req, res, next) => { res.status(404).json({ error: "404 page not found" }) })

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


module.exports = app