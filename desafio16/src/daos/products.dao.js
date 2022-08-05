const { Products } = require('../models/Product.js')

async function save(dato) {
    try {
        await Products.create(dato)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function findProdById(id) {
    try {
        return await Products.findById(id).lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function findAllProds() {
    try {
        return await Products.find().lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function deleteOne(id) {
    try {
        await Products.findOneAndDelete(id)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function updateOne(id, data) {
    try {
        await Products.findOneAndUpdate({ _id: id }, data)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}


module.exports = { save, findProdById, findAllProds, deleteOne, updateOne }