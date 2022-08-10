const express = require("express")
const router = express.Router()
const { getCart, addToCart, deleteFromCart, destroyCart, destroyCartMw }  = require('../controllers/carts.controller')
const { newOrderCommunications } = require('../controllers/communications.controller')
const { createOrder } = require('../controllers/orders.controller')
const { isLogged } = require('../utils/middlewares/loggedmw')

//Ruta /carrito
router.get('/:id/productos', isLogged, getCart)
router.post('/:id/productos', addToCart)
router.delete('/:id/productos/:id_prod', deleteFromCart)
router.post('/confirmation', [ destroyCartMw, createOrder ], newOrderCommunications)
router.delete('/:id', destroyCart) // accesible por postman, por web usamos el middleware destroy del renglon de arriba

module.exports = router