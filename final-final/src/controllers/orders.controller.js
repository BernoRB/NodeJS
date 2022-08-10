const { } = require('../services/carts.service')
const { } = require('../services/products.service')
const { createOrderServ } = require('../services/orders.service')


// Crea la orden
const createOrder = async (req, res, next) => {
    const orderProds = req.body.products
    const { email } = req.body
    await createOrderServ(email, orderProds)
    next()
}

module.exports = { createOrder }