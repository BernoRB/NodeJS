const { findCartId, create, findCartById, save, updateOnePush, updateOneSet, deleteOne } = require('../daos/carts.dao.js')

async function getCartIdByEmail(email) {
    return await findCartId(email, 'email')
}

async function createCartServ(cart) {
    cart.date = new Date().toLocaleString(),
    await create(cart)
}

async function getCartById(id) {
    return await findCartById(id)
}

// Se fija si un producto ya esta en el carrito
async function isInCart(cart, idProd) {
    return cart.products.findIndex(p => p._id == idProd)
}

// Aumento la cantidad de un producto que ya esta en carrito
async function increaseQuantity(cart, indexInCart) {
    const prodInCart = cart.products[indexInCart]
    prodInCart.quantityInCart = prodInCart.quantityInCart + 1
    cart.products[indexInCart] = prodInCart
    return cart
}

async function saveCart(cart) {
    await save(cart)
}

async function addProdToCart(idCart, prodToAdd) {
    await updateOnePush(idCart, prodToAdd)
}

async function calculateTotalOrder(cart) {
    totalOrder = 0
    cart.products.forEach(p => totalOrder += (p.quantityInCart * p.price))
    return totalOrder
}

// Reemplazamos los espacios por '%20' porque traia problemas a la hora de enviarlo a la vista
async function stringifyProds(cart) {
    return JSON.stringify(cart.products).replace(/ /g, '%20')
}

async function deleteFromArray(cart, itemIndex) {
    const productos = cart.products
    productos.splice(itemIndex, 1)
    return productos
}

async function deleteOneProd (idCart, prods) {
    await updateOneSet(idCart, prods)
}

async function destroyMyCart (id) {
    await deleteOne(id)
}

module.exports = { 
    getCartIdByEmail, createCartServ, getCartById, 
    isInCart, increaseQuantity, addProdToCart, 
    saveCart, calculateTotalOrder, stringifyProds,
    deleteFromArray, deleteOneProd, destroyMyCart
}