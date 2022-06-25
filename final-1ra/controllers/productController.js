const Product = require("../models/product");

// Luego esto es por archivo, seria tomarlo de ahi
let products = []

//router.get    ('/:id?',  product.getAllProducts)
function getAllProducts(req, res) {
    const id = req.params.id
    if (!id) {
        const resp = (products.length > 0)
        ? products
        : { error: 'Aun no hay productos' }
        res.json(resp)
    } else {
        let product = products.find((element) => element.id == id)
        res.json(product || { error: 'Producto no encontrado' })
    }
}

//router.post('/', product.saveProduct)
function saveProduct(req, res) {
    let data = req.body
    const timestamp = 'asdtimestamp'
    let newId = 1
    if (!products.length == 0)
        newId = (products[products.length-1].id) + 1 // Uno más que el último
    try {
        let product = new Product(newId, timestamp, data.title, data.desc, data.price, data.thumbnail, data.code, data.stock)
        products.push(product)
        res.json(newId)
    } catch (error) {
        res.json('Ocurrio un error al intentar agregar el producto')
    }
}

//router.put('/:id', product.modifyProduct)
function modifyProduct(req, res) {
    const data = req.body
    const timestamp = 'timestampMODIFICADA'
    const i = products.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        products[i].timestamp = data.timestamp
        products[i].title     = data.title
        products[i].desc      = data.desc
        products[i].price     = data.price
        products[i].thumbnail = data.thumbnail
        products[i].code      = data.code
        products[i].stock     = data.stock
        res.json('Producto actualizado correctamente')
    } else
        res.json({ error: 'Producto no encontrado' })
}

//router.delete ('/:id',   product.deleteProduct)
function deleteProduct(req, res) {
    const i = products.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        products.splice(i, 1)
        res.json({ ok: 'Producto eliminado correctamente'} )
    } else
        res.json({ error: 'Producto no encontrado' })
}

module.exports = { getAllProducts, saveProduct, modifyProduct, deleteProduct }

