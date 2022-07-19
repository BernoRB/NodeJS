require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { initializePassport } = require('./passport.config.js')

const path = require("path")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")

const products = require("./src/controllers/controllerProds")
const { login, loginPost, logout, dash, sessionChecker } = require('./src/controllers/loginRelated.js')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080
httpServer.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

// Sessions


let baseSession = session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/desafio11sessions'}),
  secret: 'Desafio11',
  resave: false,
  saveUninitialized: false
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
app.set("views", path.join(__dirname, "public"))
app.set("view engine", "hbs")


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






app.post('/register', passport.authenticate('register', { failureRedirect: '/failedRegister'}), (req, res) => {
  res.send({message: "signed up"})
})

app.post('/failedRegister', (req, res) => {
  res.send({error: "I cannot register"})
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/failedLogin'}), (req, res) => {
  res.send({message: "Logged In"})
})

app.post('/failedLogin', (req, res) => {
  res.send({error: "I cannot login"})
})

app.get('/currentSession', (req, res) => {
  // res.send(req.session)
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.logout((err) => {
      if (err) { console.log(err) }
      else res.send({message: "Logged out"})
  })
})


/*
app.get('/', sessionChecker, (req, res) => {
  res.redirect("/login")
})
app.get('/login', sessionChecker, login)
app.post('/login', loginPost)
app.get('/logout', logout)
app.get('/dash', dash)
*/