const log4js = require("log4js");

log4js.configure({
    appenders: {
        myLoggerConsole: { type: 'console' },
        myWarnFile: { type: 'file', filename: './logs/warn.log' },
        myErrorFile: { type: 'file', filename: './logs/error.log' }
    },
    categories: {
        default: { appenders: ['myLoggerConsole'], level: 'all' },
        console: { appenders: ['myLoggerConsole'], level: 'all' },
        warnings: { appenders: ['myWarnFile', 'myLoggerConsole'], level: "warn" },
        errors: { appenders: ['myErrorFile', 'myLoggerConsole'], level: "error" }
    }
})


const loggerConsole = log4js.getLogger('console')
const loggerWarn = log4js.getLogger('warnings')
const loggerError = log4js.getLogger('errors')

module.exports = { loggerConsole, loggerWarn, loggerError }