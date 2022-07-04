const dbControl = require("./dbController")
const { options } = require('../options/SQlite3')

const dbC = new dbControl(options, 'messages')

function createTable() {
    dbC.createTable()
}

createTable()

function getAllMessages() {
    try {
        return dbC.selectAll()
    } catch (error) {
        return('Hubo un error al intentar traer los mensajes', error)
    }
}

function saveMessage(message) {
    try {
        dbC.insert(message)
    } catch (error) {
        return('Hubo un error al intentar guardar el mensaje')
    }
}

module.exports = { getAllMessages, saveMessage }
