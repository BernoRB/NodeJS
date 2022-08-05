const { Carts } = require('../models/Carts')

// Devuelve un cartId que coincida con el campo que le pasen
async function findCartId(datum, field) {
    try {
        return await Carts.findOne({ [field]: datum }, '_id').lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function create(cart) {
    try {
        await Carts.create(cart)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function save(cart) {
    try {
        await cart.save()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function findCartById(id) {
    try {
        return await Carts.findOne({ id: id })
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function updateOnePush(id, prod) {
    try {
        await Carts.updateOne(
            { id: id },
            { $push: { products: prod } }
        )
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function updateOneSet(id, prod) {
    try {
        await Carts.updateOne(
            { _id: id },
            { $set: { products: prod } }
        )
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function deleteOne(id) {
    try {
        await Carts.deleteOne({ id })
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

module.exports = { findCartId, create, save, findCartById, updateOnePush, updateOneSet, deleteOne }