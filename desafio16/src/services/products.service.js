const { save, findProdById, findAllProds, deleteOne, updateOne } = require('../daos/products.dao')

async function createProduct(product) {
    await save(product)
}

async function getProdsServ(id) {
    return id ? await findProdById(id) : await findAllProds()
}

async function deleteProdsServ(id) {
    await deleteOne(id)
}

async function updateProd(id, prod) {
    await updateOne(id, prod)
}

module.exports = { createProduct, getProdsServ, deleteProdsServ, updateProd }