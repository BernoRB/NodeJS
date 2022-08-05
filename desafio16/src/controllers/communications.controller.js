const { bodyNewOrder, bodyNewUser, delivermail, deliversms } = require('../services/communications.service')

const newUserMail = async (req, res) => {
    const userData = req.body
    const body = await bodyNewUser(userData)
    await delivermail('Nuevo Registro', body)
    res.redirect('/productos')
}

const newOrderCommunications = async (req, res) => {
    const orderProds = (req.body.products).replace(/%20/g, ' ')
    const totalOrder = req.body.totalOrder
    const { username, email } = req.body
    const body = await bodyNewOrder(orderProds, totalOrder)
    await delivermail(`Nueva orden de ${username} (${email})`, body)
    await deliversms(`Su pedido ha sido recibido y se encuentra en proceso. Total: ${totalOrder}`, process.env.SMSTO)    
    res.redirect('/productos')
} 

module.exports = { newUserMail, newOrderCommunications }