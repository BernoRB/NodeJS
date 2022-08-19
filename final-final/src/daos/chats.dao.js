const { Messages } = require('../models/Messages')
const logger = require('../utils/logger')

async function addOne(msg) {
    try {
        await Messages.create(msg)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function getAll() {
    try {
        return await Messages.find().lean().exec()
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

module.exports = { addOne, getAll }