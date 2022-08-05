const sendmail = require('../utils/nodemailer')
const sendsms = require('../utils/twilio')

async function bodyNewOrder(orderProds, totalOrder) {
    let body = ''
    orderProds = JSON.parse(orderProds)    
    orderProds.forEach(prod => {
        body += '<br>Producto: ' + prod.title + '<br> Precio: $' + prod.price + '<br> Categoria: ' + prod.category + '<br> Cantidad: ' + prod.quantityInCart + '<br>'
    })
    body += '<br> Total de la orden: $' + totalOrder
    return body
}

async function bodyNewUser(userData) {
    return body = `
    Usuario: ${userData.username} <br>
    Email: ${userData.email} <br>
    Nombre: ${userData.name} <br>
    Direccion: ${userData.address} <br>
    Edad: ${userData.age} <br>
    Telefono: ${userData.phone}
    `
}

async function delivermail(title, body) {
    try {
        sendmail(title, body)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

async function deliversms(title, to) {
    try {
        sendsms(title, to)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}

module.exports = { bodyNewOrder, bodyNewUser, delivermail, deliversms }