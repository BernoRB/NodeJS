const { getCartIdByEmail } = require('../services/carts.service')



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