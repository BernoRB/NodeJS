const express = require('express')
const router = express.Router()

const cart = require('../controllers/cartController.js')

//router.post('/', cart.createCart)
//router.delete('/:id', cart.deleteCart)
//router.get('/:id/productos', cart.getProducts)
//router.post('/:id/productos', cart.addProduct)
//router.delete('/:id/productos/:id_prod', cart.deleteProduct)


/*
b- router base /api/carrito:
    1. POST '/' >> Crea carrito y devuelve su ID
    2. DELETE '/:id' >> Vacia un carrito y lo elimina
    3. GET '/:id/productos' >> Lista productos guardados en carrito
    4. POST '/:id/productos' >> Incorpora productos al carrito por id de producto (mm eso dice la consigna pero el ID este no es del carrito?)
    5. DELETE '/:id/productos/:id_prod' >> Eliminar un producto del carrito por su id de carrito y de producto
*/

module.exports = router