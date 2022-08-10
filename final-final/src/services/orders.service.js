const { create, getAllOrders, getAllOrdersByMail } = require('../daos/orders.dao.js')

async function createOrderServ(email, products) {
    const allOrders = await getAllOrders()
    const lastOrderNumber = allOrders.length > 0 ? allOrders[allOrders.length-1].orderNumber : 0
    const newOrder = {
        orderNumber: lastOrderNumber + 1,
        email,
        date : new Date().toLocaleString(),
        products
    }
    await create(newOrder)
}

async function getLastOrderStatus(email) {
    const orders = await getAllOrdersByMail(email)
    return orders.length > 0 ? orders[orders.length-1].status : 'ERROR'
}


module.exports = { createOrderServ, getLastOrderStatus }