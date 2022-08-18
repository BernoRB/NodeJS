require('dotenv').config()
const path = require("path")
const express = require('express')
const { initializePassport } = require('./src/utils/passport.config.js')
const passport = require('passport')
const baseSession = require('./src/utils/session')
const logger = require('./src/utils/logger')
//const cluster = require('cluster');
//const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")
const methodOverride = require('method-override')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
const httpServer = new HttpServer(app)
//const io = new IOServer(httpServer)
app.use(methodOverride('_method'))
app.use(express.json())
app.use(baseSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Views engine
app.engine(
    "hbs",
    engine({
        defaultLayout: "index.hbs",
        extname: ".hbs",
    })
)
app.set("views", path.join(__dirname, "public/views"))
app.set("view engine", "hbs")

// Conectamos a la DB
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


/*
// Socket
io.on("connection", async (socket) => {
    socket.emit("products", await products.getAllProducts())
    socket.on("new-product", async (newProduct) => {
        await products.addProduct(newProduct)
        const prods = await products.getAllProducts()
        io.sockets.emit("products", prods)
    })
})
*/







// Posibilidad de iniciar en modo cluster
const PORT = process.env.PORT || 5000
if (process.env.MODE != 'fork') {
    if (cluster.isPrimary) {
        logger.loggerConsole.info(`Proceso principal ${process.pid}`)
        for (let i = 0; i < core.cpus().length; i++)
            cluster.fork()
        cluster.on('exit', (worker) => {
            cluster.fork()
        })
    } else
        httpServer.listen(PORT, () => { logger.loggerConsole.info(`Escuchando en el puerto ${httpServer.address().port} proceso ID ${process.pid}`) })
} else
    httpServer.listen(PORT, () => { logger.loggerConsole.info(`Escuchando en el puerto ${httpServer.address().port} proceso ID ${process.pid}`) })




const socket = require("socket.io")
const chatSocket = require("./src/utils/socket")
const io = socket(httpServer)
chatSocket(io)



const mwLogger = require('./src/utils/middlewares/logger')
const routerUsers = require('./src/routes/users.routes')
const routerProducts = require('./src/routes/products.routes')
const routerCarts = require('./src/routes/carts.router')
const routerChat = require('./src/routes/chats.router')
app.use('/', mwLogger, routerUsers)
app.use('/productos', routerProducts)
app.use('/carrito', routerCarts)
app.use('/chat', routerChat)
app.get('*', (req, res) => {
    logger.loggerWarn.warn(`URL: ${req.url}, METODO: ${req.method}`)
    res.render('notfound')
})
