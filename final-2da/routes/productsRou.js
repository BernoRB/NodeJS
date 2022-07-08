const express = require('express');
const router = express.Router()

const { productsDaoMongo } = require('../daos/productsDaoMongo');
const productDao = new productsDaoMongo()

// La trae del env como un string asique la paso a bool
let admin = (process.env.ADMIN.toLowerCase() === 'true');

// Middleware para saltear la ruta en caso de que no sea admin. Se lo agrego luego a las rutas que corresponde.
function skipThisRouteMiddleware(req, res, next) {
    if (!admin) {
        return next('route')
    }
    return next()
}


router.get('/', async (req, res) => {
    const products = await productDao.getAll()
    res.json({ status: 'OK!', products})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const product = await productDao.getById(id)
    res.json({ status: 'OK!', product })
})

router.post('/', async (req, res) => {
	const product = req.body
	if(product && product.title && product.price){
		productDao.saveProduct(product)
		res.json({result: 'Producto guardado correctamente'})
	} else {
		res.json({ result: 'No se pudo guardar el producto' })
	}
})

router.delete('/:id', async (req, res) => {
	const id = req.params.id
	const product = await productDao.delete(id)
	res.json({ result: 'OK!', product_deleted: product })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
	const product = req.body	
	const response = productDao.update(product, id)
    res.json({ result: 'OK!', product: product })
})



/*
router.get('/:id?', product.getAllProducts)

router.post('/', skipThisRouteMiddleware, product.saveProduct)
router.post('/', restrictedRoute)

router.put('/:id', skipThisRouteMiddleware, product.modifyProduct)
router.put('/:id', restrictedRoute)

router.delete('/:id', skipThisRouteMiddleware, product.deleteProduct)
router.delete('/:id', restrictedRoute)
*/

// Ruta en la que terminan si no tienen permisos
function restrictedRoute(req, res) {
    res.json({
        error: 'Error',
        descripcion: 'No tiene permiso para acceder a esta ruta'
    })
}

module.exports = router;