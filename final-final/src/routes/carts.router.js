const express = require("express")
const router = express.Router()
const { getCart, addToCart, deleteFromCart, destroyCart, destroyCartMw }  = require('../controllers/carts.controller')
const { newOrderCommunications } = require('../controllers/communications.controller')
const { isLogged } = require('../utils/middlewares/loggedmw')

//Ruta /carrito
router.get('/:id/productos', isLogged, getCart)
router.post('/:id/productos', addToCart)
router.delete('/:id/productos/:id_prod', deleteFromCart)
router.post('/confirmation', destroyCartMw, newOrderCommunications)

/* 
Primero destruye el carrito
Despues los mensajes (los datos salen del body, no del carrito, ya esta destruido)
Por ultimo va a generar la orden
*/



router.delete('/:id', destroyCart) // accesible por postman, por web usamos el middleware destroy del renglon de arriba

module.exports = router