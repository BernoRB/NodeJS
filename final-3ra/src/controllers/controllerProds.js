const { Products } = require('../models/Product.js')
//const { loggerWarn } = require('../utils/logger.js')

// Agrega, funciona
const addProducts = async (req, res) => {
    const product = req.body
    await Products.create(product)
    res.redirect('/productos')
}

// Listar pre-rutear bien
const getProducts = async (req, res) => {
    if (req.user) {
        const products = await Products.find().lean() //el lean evita un warn de hbs
        res.render("dash", {
            username: req.user.username,
            email: req.user.email,
            loggedIn: true,
            products: products
        })
    } else {
        res.redirect('/login')
    }
}


// Modificar
// Eliminar

module.exports = { addProducts, getProducts }