const { getCartIdByEmail } = require('../services/carts.service')
const { addMsg, getMsgs } = require('../services/chats.service')
const io = require('../utils/socket.js').getIO()

io.on('connection', async (socket) => {
    console.log('New user connected')
    
    // Al entrar, cargamos y mostramos los mensajes
    const allMsgs = await getMsgs()
    io.emit('listar mensajes', allMsgs)

    // Envian un nuevo mensaje
    socket.on('nuevo mensaje', async ({ msg, mail }) => {
        await addMsg(msg, mail, 'usuario')
        const allMsgs = await getMsgs()
        io.emit('nuevo mensaje', allMsgs)
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


module.exports = { init }