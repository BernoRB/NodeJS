const { addOne, getAll, getAllByMail } = require('../daos/chats.dao.js')

async function addMsg(msg, email, type) {
    const data = {
        email,
        date: new Date().toLocaleString(),
        type,
        body: msg,
    }
    return await addOne(data)
}

async function getMsgs() {
    return await getAll()
}

async function getMsgsByEmail(email) {
    return await getAllByMail(email)
}

module.exports = { addMsg, getMsgs, getMsgsByEmail }