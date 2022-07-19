require('dotenv').config()
const express = require("express")
const path = require("path")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const products = require("./src/controllers/controllerProds")


// Cosas de sessions
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')


// Sessions
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    }),

    key: 'user_sid',
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60_000 } // 1 min
  })
)

// Views engine
app.engine(
  "hbs",
  engine({
    defaultLayout: "index.hbs",
    extname: ".hbs",
  })
)
app.set("views", path.join(__dirname, "public"))
app.set("view engine", "hbs")

const PORT = 8080
httpServer.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

// Socket
io.on("connection", async (socket) => {
  // Productos
  socket.emit("products", await products.getAllProducts())
  socket.on("new-product", async (newProduct) => {
    await products.addProduct(newProduct)
    const prods = await products.getAllProducts()
    io.sockets.emit("products", prods)
  })
})



const { login, loginPost, logout, dash, sessionChecker } = require('./src/controllers/loginRelated.js')

app.get('/', sessionChecker, (req, res) => {
  res.redirect("/login")
})
app.get('/login', sessionChecker, login)
app.post('/login', loginPost)
app.get('/logout', logout)
app.get('/dash', dash)