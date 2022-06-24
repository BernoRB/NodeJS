const Product = require("../models/productClass");

let products = []

// Guardar productos
function save(name, price, thumb) {
    try {
        let newProd = new Product(name, price, thumb)
        products.push(newProd)
    } catch (error) {
        console.log('Ocurrio un error al intentar agregar el producto')
    }
    return products
}

// Obtener todos los productos
function getAll() {
    const rta = (products.length > 0)
        ? products
        : ''
    return rta
}

module.exports = { save, getAll }