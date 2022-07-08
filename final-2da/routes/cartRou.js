const express = require('express')
const router = express.Router()

const cart = require('../controllers/cartController.js')

router.post('/', cart.createCart)
router.delete('/:id', cart.deleteCart)
router.get('/:id/productos', cart.getProductsC)
router.post('/:id/productos', cart.addProductC)
router.delete('/:id/productos/:id_prod', cart.deleteProductC)

module.exports = router