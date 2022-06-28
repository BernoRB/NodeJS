const express = require('express')
const router = express.Router()
const product = require('../controllers/productController.js')

// La trae del env como un string asique la paso a bool
let admin = (process.env.ADMIN.toLowerCase() === 'true');

// Middleware para saltear la ruta en caso de que no sea admin. Se lo agrego luego a las rutas que corresponde.
function skipThisRouteMiddleware(req, res, next) {
    if (!admin) {
        return next('route')
    }
    return next()
}

router.get('/:id?', product.getAllProducts)
router.post('/', skipThisRouteMiddleware, product.saveProduct)
router.post('/', product.restrictedRoute)
router.put('/:id', skipThisRouteMiddleware, product.modifyProduct)
router.put('/:id', product.restrictedRoute)
router.delete('/:id', skipThisRouteMiddleware, product.deleteProduct)
router.delete('/:id', product.restrictedRoute)

module.exports = router;