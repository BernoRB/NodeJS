const express = require('express')
const router = express.Router()
const product = require('../controllers/productController.js')

const admin = 1 // Puesta momentaneamente aca, despues supongo habra tipos de usuario
// Funcion que, si no es admin, hace que pase a la siguiente ruta coincidente (y lo mandamos a un metodo que le indica error)
function skipThisRouteMiddleware (req, res, next) {
    if (admin == 0) {
        return next('route');
    }
    return next();
}

router.get('/:id?', product.getAllProducts)

router.post('/', skipThisRouteMiddleware, product.saveProduct)
router.post('/', product.restrictedRoute)

router.put('/:id', skipThisRouteMiddleware, product.modifyProduct)
router.put('/:id', product.restrictedRoute)

router.delete('/:id', skipThisRouteMiddleware, product.deleteProduct)
router.delete('/:id', product.restrictedRoute)

module.exports = router;