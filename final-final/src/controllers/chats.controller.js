const { getCartIdByEmail } = require('../services/carts.service')
const { addMsg, getMsgs, getMsgsByEmail } = require('../services/chats.service')
const io = require('../utils/socket.js').getIO()

io.on('connection', async (socket) => {
    console.log('New user connected')

    // Al entrar, cargamos y mostramos los mensajes
    const allMsgs = await getMsgs()
    io.emit('listar mensajes', allMsgs)

    // Envian una pregunta
    socket.on('nuevo mensaje', async ({ msg, mail }) => {
        await addMsg(msg, mail, 'usuario')
        const allMsgs = await getMsgs()
        io.emit('listar mensajes', allMsgs)
    })

    // Envian una respuesta
    socket.on('nueva respuesta', async ({ msg, mail }) => {
        await addMsg(msg, mail, 'sistema')
        const allMsgs = await getMsgs()
        io.emit('listar mensajes', allMsgs)
    })

    // Solicitan ver las respuestas
    socket.on('ver respuestas', async (mail) => {
        const allMsgsMail = await getMsgsByEmail(mail)
        io.emit('ver respuestas', allMsgsMail)
    })
})

const init = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const cart = await getCartIdByEmail(req.user.email)
    const cartId = cart._id
    res.render('chat', {
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        avatar: `../../images/${req.user.avatar}`,
        cartId,
        isAdmin,
    })
}


const privateChat = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const cart = await getCartIdByEmail(req.user.email)
    const cartId = cart._id
    res.render('chatUser', {
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        avatar: `../../images/${req.user.avatar}`,
        cartId,
        isAdmin,
    })
}


module.exports = { init, privateChat }