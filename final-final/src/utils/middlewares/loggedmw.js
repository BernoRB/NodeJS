require('dotenv').config()


const middlewares = {

    // Solo lo deja seguir si está logeado
    isLogged(req, res, next) {
        if (req.user) return next()
        res.redirect('/login')
    },

    // Solo lo deja seguir si NO está logeado
    isNotLogged(req, res, next) {
        if (!req.user) return next()
        res.redirect('/productos')
    }

}
module.exports = middlewares