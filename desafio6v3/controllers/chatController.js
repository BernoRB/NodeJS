const Chat = require("../models/chatClass");
const fs = require('fs').promises

async function getAllMessages() {
    try {
        let chat = new Chat()
        const chatFile = await fs.readFile(chat.filename, 'utf-8')
        const chatData = JSON.parse(chatFile)
        return chatData
    } catch (error) {
        return('Hubo un error al intentar traer los mensajes', error)
    }
}

async function saveMessage(message) {
    try {
        let chat = new Chat()
        let messagesList = await getAllMessages()
        messagesList.push(message)
        await fs.writeFile(chat.filename, JSON.stringify(messagesList))
    } catch (error) {
        return('Hubo un error al intentar guardar el mensaje')
    }
}

module.exports = { getAllMessages, saveMessage }
