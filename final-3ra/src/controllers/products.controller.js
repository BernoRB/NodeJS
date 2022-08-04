const { Products } = require('../models/Product.js')
//const { loggerWarn } = require('../utils/logger.js')
const { Carts } = require('../models/Carts')
require('dotenv').config()

// Agrega, funciona
const addProducts = async (req, res) => {
    const product = {
        title : req.body.title,
        price : req.body.price,
        desc : req.body.desc,
        thumbnail : req.file.filename,
        category : req.body.category,
        stock : req.body.stock,
    }
    await Products.create(product)
    res.redirect('/productos')
}

// Listar, todos o por ID
const getProducts = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    if (req.user) {
        const id = req.params.id || null
        if (id != null) {
            const product = await Products.findById(id).lean().exec()
            if (product !== null)
                res.json(product)
            else
                res.status(400).json({ error: 'Producto no encontrado' })
        } else {
            let cartId = await Carts.findOne({ email: req.user.email }, '_id').exec() // Traemos el CART ID para renderizar los botones con href dinamico
            let products = await Products.find().lean() //el lean evita un warn de hbs
            res.render("dash", {
                username: req.user.username,
                email: req.user.email,
                avatar: `images/${req.user.avatar}`,
                loggedIn: true,
                products: products,
                cartId: cartId._id, //Genera el botón "add to cart" con ruta dinamica segun id del carrito actual
                isAdmin: isAdmin
            })
        }
    } else
        res.redirect('/login')
}


// Eliminar productos por ID
const deleteProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Products.findOneAndDelete(id) // .lean().exec()
        res.json(id)
    }
    catch (error) {
        res.status(400).json({ error: 'Error' })
    }
}


// Modificar productos por ID, data por body
const modifyProducts = async (req, res) => {
    const id = req.params.id
    const product = Products.findById(id).lean().exec()
    if (product !== null) {
        await Products.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ mensaje: `Se ha actualizado el producto ${id}` });
    } else {
        res.status(400).json({ error: 'Producto no encontrado' });
    }
}

module.exports = { addProducts, getProducts, deleteProducts, modifyProducts }