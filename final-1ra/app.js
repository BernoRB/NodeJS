const express = require('express')
const path = require('path')
const http = require('http')
const PORT = 8080

// const index = require('./routes/index');
const products = require('./routes/productsRou')
const cart = require('./routes/cartRou')

const app = express()

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'twig');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//app.use('/', index);
app.use('/api/carrito', cart)
app.use('/api/productos', products)







const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



module.exports = app;