const { Orders } = require('../models/Orders')
const logger = require('../utils/logger')

async function create(order) {
    try {
        await Orders.create(order)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function getAllOrders() {
    try {
        return await Orders.find().lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function getAllOrdersByMail(email) {
    try {
        return await Orders.find({ email: email }).lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

module.exports = { create, getAllOrders, getAllOrdersByMail }