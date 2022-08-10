const { getCartIdByEmail, createCartServ, getCartById, 
        addProdToCart, isInCart, increaseQuantity, 
        saveCart, calculateTotalOrder, stringifyProds,
        deleteFromArray, deleteOneProd, destroyMyCart
    } = require('../services/carts.service')
const { getProdsServ } = require('../services/products.service')


// Crea un carrito en caso de no existir
const createCart = async (req, res, next) => {
    const { email } = req.user
    const hasCart = await getCartIdByEmail(email)
    if (!hasCart) {
        const cart = {
            email: req.user.email,
            address: req.user.address
        }
        await createCartServ(cart)
    }
    next()
}

const addToCart = async (req, res) => {
    const idCart = req.params.id
    const idProd = req.body.productId
    const cart = await getCartById(idCart)
    const prodToAdd = await getProdsServ(idProd)
    const indexInCart = await isInCart(cart, idProd)
    if(indexInCart > -1) {
        const updatedCart = await increaseQuantity(cart, indexInCart)
        await saveCart(updatedCart)
    } else {
        await addProdToCart(idCart, prodToAdd)
    }
    res.redirect('/productos')
}

const getCart = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const idCart = req.params.id
    const cart = await getCartById(idCart)
    const totalOrder = await calculateTotalOrder(cart)
    const productsString = await stringifyProds(cart)
    res.render('cart', {
        username: req.user.username,
        email: req.user.email,
        avatar: `../../images/${req.user.avatar}`,
        products: cart.products,
        loggedIn: true,
        cartId: idCart,
        totalOrder,
        productsString,
        isAdmin
    })
}


const deleteFromCart = async (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.id_prod
    const cart = await getCartById(idCart)
    const itemIndex = await isInCart(cart, idProd)
    const productsUpd = await deleteFromArray(cart, itemIndex)
    await deleteOneProd(idCart, productsUpd)
    res.redirect(`/carrito/${idCart}/productos`)
}

// Dos destroyCart
// Uno estilo middleware para cuando le pego por la web tras confirmar la orden
// El otro para pegarle por postman y cumplir la consigna de que exista esa ruta delete
const destroyCartMw = async (req, res, next) => {
    const { cartId } = req.body
    await destroyMyCart(cartId)
    next()
}

const destroyCart = async (req, res) => {
    const { id } = req.params
    await destroyMyCart(id)
    res.json('Eliminado')
}

module.exports = { createCart, addToCart, getCart, deleteFromCart, destroyCart, destroyCartMw }