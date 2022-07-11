const express = require('express')
const router = express.Router()

const { cartsDaoMongo } = require('../daos/cartsDaoMongo')
const cartsDao = new cartsDaoMongo()


// Crea un carrito. No agrega prods, nada. Lo crea.
router.post('/', async (req, res) => {
    const cart = {}
    try {
        const cartId = await cartsDao.createCart(cart)
        res.json(`Carrito creado con el id ${cartId}`)
    } catch (err) {
        res.json('Ocurrio un error al intentar crear el carrito')
    }
})

// Borro carrito
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await cartsDao.delete(id)
        res.json('Carrito eliminado correctamente')
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

// Agrego productos al carrito, recibiendo id del carrito y id del producto
router.post('/:id/productos', async (req, res) => {
    try {
        const idCart = req.params.id
        const idProd = req.body.idProd
        await cartsDao.addToCart(idCart, idProd)
        res.json('Producto agregado correctamente')
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

// Mostrar los productos que contiene el carrito :id
router.get('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params
        const prods = await cartsDao.getByIdCart(id)
        res.json(prods)
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})

// Elimino producto del carrito
router.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const idCart = req.params.id
        const idProd = req.params.id_prod
        await cartsDao.deleteFromCart(idCart, idProd)
        res.json('Producto eliminado del carrito')
    } catch (error) {
        res.json(`Ocurrio un error: ${error.message}`)
    }
})



module.exports = router;