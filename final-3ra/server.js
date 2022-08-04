require('dotenv').config()
const path = require("path")
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { initializePassport } = require('./src/utils/passport.config.js')
const passport = require('passport')

//const cluster = require('cluster');
//const core = require('os');

const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")

const app = express()
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(__dirname+'/public'));
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Sessions
let baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
    mongoOptions: {        useNewUrlParser: true,        useUnifiedTopology: true,    },
    secret: 'f1n4lc0d3r',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600_000 }
})

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

// Para hacer DELETE y PUT desde un form
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const PORT = 8080

httpServer.listen(PORT, () => { console.log(`Escuchando en el puerto ${httpServer.address().port} proceso ID ${process.pid}`) })

const mwLogger = require('./src/middlewares/logger')
const routerUsers = require('./src/routes/users.routes')
const routerProducts = require('./src/routes/products.routes')
const routerCarts = require('./src/routes/carts.router')
app.use('/', mwLogger, routerUsers)
app.use('/productos', routerProducts)
app.use('/carrito', routerCarts)


app.get('*', (req, res) => {
    //logger.loggerWarn.warn(`URL: ${req.url}, METODO: ${req.method}`)
    res.json('404')
})