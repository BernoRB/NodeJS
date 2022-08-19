const { addOne, getAll } = require('../daos/chats.dao.js')

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


module.exports = { addMsg, getMsgs }