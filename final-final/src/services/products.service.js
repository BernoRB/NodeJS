const { save, findProdById, findAllProds, deleteOne, updateOne, findByField } = require('../daos/products.dao')

async function createProduct(product) {
    await save(product)
}

async function getProdsServ(id) {
    if(id) {
        return await findProdById(id)
    } else {
        const products = await findAllProds()
        return products.sort(() => Math.random() - 0.5) 
    }
}

async function deleteProdsServ(id) {
    await deleteOne(id)
}

async function updateProd(id, prod) {
    await updateOne(id, prod)
}

async function getProdsByField(field, datum) {
    return await findByField(field, datum)
}

module.exports = { createProduct, getProdsServ, deleteProdsServ, updateProd, getProdsByField }