const express = require('express');
const router = express.Router()

const { cartsDaoMongo } = require('../daos/cartsDaoMongo');
const cartsDao = new cartsDaoMongo()

// Crea un carrito. No agrega prods, nada. Lo crea.
router.post('/', async (req, res) => {
    let cart = {}
    cartsDao.createCart(cart)
    res.json('Carrito creado')
})

/*
router.delete('/:id', cart.deleteCart)
router.get('/:id/productos', cart.getProductsC)

//
router.post('/:id/productos', cart.addProductC)
router.delete('/:id/productos/:id_prod', cart.deleteProductC)
*/
module.exports = router;