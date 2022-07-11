const express = require('express');
const router = express.Router()
const { productsDaoMongo } = require('../daos/productsDaoMongo');
const productDao = new productsDaoMongo()

// La trae del env como un string asique la paso a bool
const admin = (process.env.ADMIN.toLowerCase() === 'true');

// Middleware para saltear la ruta en caso de que no sea admin. Se lo agrego luego a las rutas que corresponde.
function skipThisRouteMiddleware(req, res, next) {
    if (!admin) {
        return next(restrictedRoute(req, res))
    }
    return next()
}


router.get('/', async (req, res) => {
    try {
        const products = await productDao.getAll()
        res.json(products)
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await productDao.getById(id)
        res.json(product)
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

router.post('/', skipThisRouteMiddleware, async (req, res) => {
	const product = req.body
	if(product && product.title && product.price){
		await productDao.saveProduct(product)
		res.json('Producto guardado correctamente')
	} else {
		res.json('No se pudo guardar el producto')
	}
})

router.delete('/:id', skipThisRouteMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await productDao.delete(id)
        res.json('Producto eliminado')
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

router.put('/:id', skipThisRouteMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const product = req.body	
        await productDao.update(product, id)
        res.json('Producto modificardo correctamente')
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})


// Ruta en la que terminan si no tienen permisos
function restrictedRoute(req, res) {
    res.json({
        error: 'Error',
        descripcion: 'No tiene permiso para acceder a esta ruta'
    })
}


module.exports = router;