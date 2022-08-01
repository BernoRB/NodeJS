const { Products } = require('../models/Product.js')
//const { loggerWarn } = require('../utils/logger.js')

// Agrega, funciona
const addProducts = async (req, res) => {
    const product = req.body
    await Products.create(product)
    res.redirect('/productos')
}

// Listar, todos o por ID
const getProducts = async (req, res) => {
    if (req.user) {
        const id = req.params.id || null
        if (id != null) {
            const product = await Products.findById(id).lean().exec()
            if (product !== null)
                res.json(product)
            else
                res.status(400).json({ error: 'Producto no encontrado' })
        } else {
            const products = await Products.find().lean() //el lean evita un warn de hbs
            res.render("dash", {
                username: req.user.username,
                email: req.user.email,
                loggedIn: true,
                products: products
            })
        }
    } else
        res.redirect('/login')
}


// Eliminar productos por ID
const deleteProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Products.findOneAndDelete(id).lean().exec()
        res.json(id)
    }
    catch (error) {
        res.status(400).json({ error: 'Error' })
    }
}



// Modificar

module.exports = { addProducts, getProducts, deleteProducts }