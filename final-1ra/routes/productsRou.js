const express = require('express')
const router = express.Router()

const product = require('../controllers/productController.js')

router.get    ('/:id?',  product.getAllProducts)
router.post   ('/',      product.saveProduct)
router.put    ('/:id',   product.modifyProduct)
router.delete ('/:id',   product.deleteProduct)


module.exports = router;

/*
a- router base /api/productos:
    1. GET '/:id?' >> Listar todos los productos O por id (ambas segun ponga ID)
    solo para admins:
    2. POST '/' >> Incorporo producto
    3. PUT '/:id' >> Actualiza producto
    4. DELETE ':/id' >> Borra producto
*/