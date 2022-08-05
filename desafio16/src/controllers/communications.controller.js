const sendmail = require('../utils/nodemailer')
const sendsms = require('../utils/twilio')

const newUserMail = async (req, res) => {
    const asunto = 
    `
    Usuario: ${req.body.username} <br>
    Email: ${req.body.email} <br>
    Nombre: ${req.body.name} <br>
    Direccion: ${req.body.address} <br>
    Edad: ${req.body.age} <br>
    Telefono: ${req.body.phone}
    `
    sendmail('Nuevo Registro', asunto)
    res.redirect('/productos')
}



const newOrderCommunications = async (req, res) => {
    let asunto = ''
    let prods = (req.body.products).replace(/%20/g, ' ')
    prods = JSON.parse(prods)    
    prods.forEach(prod => {
        asunto += '<br>Producto: ' + prod.title + '<br> Precio: $' + prod.price + '<br> Categoria: ' + prod.category + '<br> Cantidad: ' + prod.quantityInCart + '<br>'
    })
    asunto += '<br> Total de la orden: $' + req.body.totalOrder

    sendmail(`Nueva orden de ${req.body.username} (${req.body.email})`, asunto)
    sendsms(`Su pedido ha sido recibido y se encuentra en proceso. Total: ${req.body.totalOrder}`, process.env.SMSTO)
    
    res.redirect('/productos')
    
} 

module.exports = { newUserMail, newOrderCommunications }