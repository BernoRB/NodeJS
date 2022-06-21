const Product = require("./classes");

let products = []

// Guardar productos
function save(name, price, thumbnail) {
    // Buscamos y asignamos el ID
    let newId = 1
    if (!products.length == 0) {
        products.map(prod => {
            if (prod.id > newId)
                newId = prod.id
        })
        newId++
    }
    try {
        let newProd = new Product(newId, name, price, thumbnail)
        products.push(newProd)
    } catch (error) {
        console.log('Ocurrio un error al intentar agregar el producto')
    }
    return newId
}

// Obtener todos los productos
function getAll() {
    return products
}

// Obtener un producto con determinado ID
function getById(id) {
    let prod = products.find((element) => element.id == id)
    return prod || { error: 'Producto no encontrado' }
}

// Modificar un producto
function modify(id, name, price, thumbnail) {
    const i = products.findIndex((element) => element.id == id)
    if (i != -1) {
        products[i].name = name
        products[i].price = price
        products[i].thumbnail = thumbnail
        return ('Producto actualizado correctamente')
    } else
        return ({ error: 'Producto no encontrado' })
}

// Eliminar un producto con un determinado ID
function deleteById(id) {
    const i = products.findIndex((element) => element.id == id)
    if (i != -1) {
        products.splice(i, 1)
        return ('Producto eliminado correctamente')
    } else
        return ({ error: 'Producto no encontrado' })
}

module.exports = { save, getAll, getById, modify, deleteById };