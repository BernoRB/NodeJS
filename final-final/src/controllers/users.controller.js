const { getCartIdByEmail } = require('../services/carts.service')
const core = require('os');

const mainGet = async (req, res) => {
    res.redirect('/productos')
}

const loginGet = async (req, res) => {
    res.render('login')
}

const loginPost = async (req, res) => {
    res.redirect('/productos')
}

const retryLogin = async (req, res) => {
    res.render("login", {
        retryLogin: true
    })
}

const retrySignup = async (req, res) => {
    res.render('login', {
        retrySignup: true
    })
}

const myAccount = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const cart = await getCartIdByEmail(req.user.email)
    const cartId = cart._id
    res.render('account', {
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        avatar: `../../images/${req.user.avatar}`,
        address: req.user.address,
        age: req.user.age,
        phone: req.user.phone,
        cartId,
        isAdmin
    })
}

const infoServer = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const cart = await getCartIdByEmail(req.user.email)
    const cartId = cart._id
    res.render('info', {
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        avatar: `../../images/${req.user.avatar}`,
        cartId,
        isAdmin,
        platform: process.platform,
        memory: process.memoryUsage().rss,
        pid: process.pid,
        qCpus: core.cpus().length,
        nodeVersion: process.version,
        port: process.env.PORT,
        databaseUrl: process.env.MONGOURLSINCRED,
        adminmail: process.env.ADMINMAIL,
        cookietime: req.session.cookie.originalMaxAge
    })
}

const logout = async (req, res) => {
    nameLogout = req.user.username
    req.logout((err) => {
        if (err) {
            res.redirect('/login')
        }
        else
            res.render("logout", {
                nameLogout
            })
    })
}

module.exports = { mainGet, loginGet, loginPost, retryLogin, logout, myAccount, infoServer, retrySignup }