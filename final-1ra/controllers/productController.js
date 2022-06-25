const Product = require("../models/product");

// Luego esto es por archivo, seria tomarlo de ahi
let products = []

//router.get    ('/:id?',  product.getAllProducts)
function getAllProducts(req, res) {
    var id = req.params.id
    if (!id) {
        res.json('TODOS LOS PRODUCTOS, NO HAY ID')
    } else {
        res.json(`PRODUCTO CON ID ${id}`)
    }
}

//router.post   ('/',      product.saveProduct)
function saveProduct(req, res) {
    let data = req.body
    const timestamp = 'asdtimestamp'
    let newId = 1
    if (!products.length == 0) {
        newId = (products[products.length-1].id) + 1 // Uno más que el último
    }
    try {
        let product = new Product(newId, timestamp, data.title, data.desc, data.price, data.thumbnail, data.code, data.stock)
        products.push(product)
        res.json(newId)
    } catch (error) {
        res.json('Ocurrio un error al intentar agregar el producto')
    }
}

//router.put    ('/:id',   product.modifyProduct)
function modifyProduct(req, res) {
    res.json('entrado a modifyProduct')
}

//router.delete ('/:id',   product.deleteProduct)
function deleteProduct(req, res) {
    res.json('entrado a deleteProduct')
}

module.exports = { getAllProducts, saveProduct, modifyProduct, deleteProduct }

