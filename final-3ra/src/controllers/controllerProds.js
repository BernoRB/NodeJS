const { products } = require('../models/Product.js')

// Agrega, funciona
const addProducts = async (req, res) => {
    const product = req.body
    await products.create(product)
    res.json('tamos')
}

// Listar
// Modificar
// Eliminar

module.exports = { addProducts }