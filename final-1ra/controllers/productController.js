const fs = require('fs')
const path = require('path');

const Product = require("../models/product");

prodsPath = path.join(__dirname, '..', 'data', 'prodsDB.json')


// Traer todos los productos del archivo
function getAllP() {
    try {
        const prodsFile = fs.readFileSync(prodsPath, 'utf-8')
        const prodsData = JSON.parse(prodsFile)
        return prodsData
    } catch (error) {
        console.log('Error al obtener los productos', error)
    }
}

// Guardar en el archivo
function saveInFile(products) {
    fs.writeFile(prodsPath, JSON.stringify(products), (err) => {
        if (err) throw err
        console.log('Archivo guardado correctamente')
    })
}

//router.get('/:id?', product.getAllProducts)
function getAllProducts(req, res) {
    const products = getAllP()
    const id = req.params.id
    if (!id) {
        res.json(products)
    } else {
        let product = products.find((element) => element.id == id)
        res.json(product || { error: 'Producto no encontrado' })
    }
}

//router.post('/', product.saveProduct)
function saveProduct(req, res) {
    const products = getAllP()
    let data = req.body
    const timestamp = new Date().toLocaleString()
    let newId = 1
    if (!products.length == 0)
        newId = (products[products.length - 1].id) + 1 // Uno más que el último
    try {
        let product = new Product(newId, timestamp, data.title, data.desc, data.price, data.thumbnail, data.code, data.stock)
        products.push(product)
        saveInFile(products)
        res.json(newId)
    } catch (error) {
        res.json('Ocurrio un error al intentar agregar el producto')
    }
}

//router.put('/:id', product.modifyProduct)
function modifyProduct(req, res) {
    const products = getAllP()
    const data = req.body
    const timestamp = new Date().toLocaleString()
    const i = products.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        products[i].timestamp = timestamp
        products[i].title = data.title
        products[i].desc = data.desc
        products[i].price = data.price
        products[i].thumbnail = data.thumbnail
        products[i].code = data.code
        products[i].stock = data.stock
        saveInFile(products)
        res.json('Producto actualizado correctamente')
    } else
        res.json({ error: 'Producto no encontrado' })
}

//router.delete ('/:id',   product.deleteProduct)
function deleteProduct(req, res) {
    const products = getAllP()
    const i = products.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        products.splice(i, 1)
        saveInFile(products)
        res.json({ ok: 'Producto eliminado correctamente' })
    } else
        res.json({ error: 'Producto no encontrado' })
}

module.exports = { getAllProducts, saveProduct, modifyProduct, deleteProduct }