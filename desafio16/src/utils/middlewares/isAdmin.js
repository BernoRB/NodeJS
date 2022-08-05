require('dotenv').config()

const isAdmin = ( req, res, next ) => {
    const ADMIN = process.env.ADMIN
    const path = req.originalUrl
    if (ADMIN != 'YES'){
        return res.status(401).json({ Error: `No sos admin! Ruta ${path} no autorizada` })
    }
    next()
}

module.exports = { isAdmin }