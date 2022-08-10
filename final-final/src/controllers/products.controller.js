const { getCartIdByEmail } = require('../services/carts.service')
const { createProduct, getProdsServ, deleteProdsServ, 
        updateProd,  getProdsByField 
    } = require('../services/products.service')
require('dotenv').config()

// Renderiza vista anadir productos si el usuario es admin
const renderAddProducts = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const { email } = req.user
    const cartId = await getCartIdByEmail(email)
    res.render('addProd', {
        username: req.user.username,
        email: req.user.email,
        isAdmin,
        avatar: `../../images/${req.user.avatar}`,
        cartId: cartId._id
    })
}

// Agrega productos
const addProducts = async (req, res) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        thumbnail: req.file.filename,
        category: req.body.category,
        stock: req.body.stock,
    }
    await createProduct(product)
    res.redirect('/productos')
}

// Listar, todos o por ID
const getProducts = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const id = req.params.id || null
    let products = await getProdsServ(id)
    const { email } = req.user
    const cartId = await getCartIdByEmail(email)
    if (products) {
        res.render("dash", {
            username: req.user.username,
            email,
            avatar: `images/${req.user.avatar}`,
            loggedIn: true,
            products,
            cartId: cartId._id,
            isAdmin
        })
    } else {
        res.render('notfound', { isProduct: true })
    }
}


// Eliminar productos por ID
const deleteProducts = async (req, res) => {
    const { id } = req.params
    await deleteProdsServ(id)
    res.status(200).json({ mensaje: `Se ha eliminado el producto ${id}` })
}


// Modificar productos por ID, data por body
const modifyProducts = async (req, res) => {
    const { id } = req.params
    const productUpd = req.body
    const product = await getProdsServ(id)
    if (product !== null) {
        await updateProd(id, productUpd)
        res.status(200).json({ mensaje: `Se ha actualizado el producto ${id}` })
    } else {
        res.status(400).json({ error: 'Producto no encontrado' });
    }
}

// Muestra los productos de una determinada categoria
const showByCategory = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const { email } = req.user
    const cartId = await getCartIdByEmail(email)
    const selectedCateg = req.params.categoria
    const products = await getProdsByField('category', selectedCateg)
    if (products.length > 0) {
        res.render("dash", {
            username: req.user.username,
            email,
            avatar: `../../images/${req.user.avatar}`,
            loggedIn: true,
            products,
            cartId: cartId._id,
            isAdmin
        })
    } else {
        res.render('notfound')
    }
}



module.exports = { addProducts, renderAddProducts, getProducts, 
                   deleteProducts, modifyProducts, showByCategory }