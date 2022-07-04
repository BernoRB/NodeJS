const express = require('express')

const chatController = require('./controllers/chatController')
const productController = require('./controllers/productController')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


io.on('connection', async socket => {
    
    // Productos
    socket.emit('products', await productController.getAll())
    socket.on('new-product', ({ name, price, thumb}) => {
        const products = productController.save(name, price, thumb)
        io.sockets.emit('products', products)
    })

    // Chat
    socket.emit('messages', await chatController.getAllMessages())
    socket.on('new-message', async message => {
        await chatController.saveMessage(message)
        io.sockets.emit('messages', await chatController.getAllMessages())
    })
})

const PORT = 8080
server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => console.log(err))



/*****************************************************************************/

// ----------- //
// CARGA FALSA //
// ----------- //

// Como siempre dejo la carga falsa de productos para facilitar las pruebas,
// sobre todo en el tema de los thumbnail
app.get('/cargaFalsa', (req, res) => {
    productController.save('Las Moras', 600, './imgs/lasmoras.jpg')
    productController.save('Otro loco mas', 500, './imgs/otroloco.jpg')
    productController.save('Trumpeter', 1100, './imgs/trumpeter.jpg')
    res.redirect('/')
})

/*****************************************************************************/
