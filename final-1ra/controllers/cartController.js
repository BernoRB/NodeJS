const fs = require('fs')
const path = require('path');

// const Product = require("../models/product");
const Cart = require("../models/cart")

cartsPath = path.join(__dirname, '..', 'data', 'cartsDB.json')
prodsPath = path.join(__dirname, '..', 'data', 'prodsDB.json')

// Traer todos los carritos del archivo
function getAllC() {
    try {
        const cartsFile = fs.readFileSync(cartsPath, 'utf-8')
        const cartsData = JSON.parse(cartsFile)
        return cartsData
    } catch (error) {
        console.log('Error al obtener los carritos', error)
    }
}

// Traer todos los productos del archivo (para agregarlos al carrito por ID)
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
function saveInFile(carts) {
    fs.writeFile(cartsPath, JSON.stringify(carts), (err) => {
        if (err) throw err
        console.log('Archivo carrito guardado correctamente')
    })
}

//router.post('/', cart.createCart)
function createCart(req, res) {
    const carts = getAllC()
    const timestamp = new Date().toLocaleString()
    let newId = 1
    if (!carts.length == 0)
        newId = (carts[carts.length - 1].id) + 1 // Uno más que el último
    try {
        let cart = new Cart(newId, timestamp, [])
        carts.push(cart)
        saveInFile(carts)
        res.json(newId)
    } catch (error) {
        res.json('Ocurrio un error al intentar crear el carrito')
    }
}

//router.delete('/:id', cart.deleteCart)
function deleteCart(req, res) {
    const carts = getAllC()
    const i = carts.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        carts.splice(i, 1)
        saveInFile(carts)
        res.json({ ok: 'Carrito eliminado correctamente' })
    } else
        res.json({ error: 'Carrito no encontrado' })
}

//router.get('/:id/productos', cart.getProductsC)
function getProductsC(req, res) {
    const carts = getAllC()
    const i = carts.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        res.json(carts[i].products)
    } else
        res.json({ error: 'Carrito no encontrado' })
}

//router.post('/:id/productos', cart.addProductC)
//ASUMO QUE POR BODY SE PASA EL ID DEL PRODUCTO A AGREGAR
function addProductC(req, res) {
    const products = getAllP()
    const carts = getAllC()
    const i = products.findIndex((element) => element.id == req.body.idProd)
    const j = carts.findIndex((element) => element.id == req.params.id)
    if ((i != -1) && (j != -1)) {
        carts[j].products.push(products[i])
        saveInFile(carts)
        res.json({ ok: 'Producto añadido al carrito' })
    } else
        res.json({ error: 'El producto que intenta añadir al carrito no existe' })
}


//router.delete('/:id/productos/:id_prod', cart.deleteProductC)
function deleteProductC(req, res) {
    const carts = getAllC()
    const i = carts.findIndex((element) => element.id == req.params.id)
    if (i != -1) {
        const cart = carts[i]
        let j = cart.products.findIndex((element) => element.id == req.params.id_prod)
        if (j != -1) {
            carts[i].products.splice(j, 1)
            saveInFile(carts)
            res.json({ ok: 'Producto eliminado del carrito' })
        } else
            res.json({ error: 'No hay un producto con ese ID en tu carrito '})
    } else
        res.json({ error: 'Carrito no encontrado' })
}

module.exports = { createCart, deleteCart, getProductsC, addProductC, deleteProductC }