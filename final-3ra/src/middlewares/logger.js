const logger = require('../utils/logger')

function mwLogger(req, res, next){
    logger.loggerConsole.info(`URL: ${req.url}, METODO: ${req.method}`)
    next()
}

module.exports = mwLogger