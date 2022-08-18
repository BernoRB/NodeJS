const { getCartIdByEmail } = require('../services/carts.service')
const io = require("../utils/socket.js").getIO()


const init = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const cart = await getCartIdByEmail(req.user.email)
    const cartId = cart._id


    io.on('connection', (socket) => {
        varprueba = 'churrasco'
        console.log('New user connected')

        socket.on('nuevo mensaje', (msj) => {
            io.emit('nuevo mensaje', msj)
        })

        socket.on('disconnect', function () {
            console.log('Usuario desconectado')
        })

    })


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