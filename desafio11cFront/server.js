require('dotenv').config()
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { initializePassport } = require('./passport.config.js')

const path = require("path")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")

const products = require("./src/controllers/controllerProds")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080
httpServer.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

// Sessions, passport
let baseSession = session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/desafio11sessions' }),
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


// Rutas
app.get('/', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
  res.redirect("/dashboard")
})

app.get('/dashboard', (req, res) => {
  if (req.user) {
    res.render("dash", {
      username: req.user.username,
      email: req.user.email,
      loggedIn: true
    })
  } else
    res.redirect('/login')
})

app.get('/login', (req, res) => {
  if (req.user) //si ya esta logeado y entra aca lo mandamos al dash
    res.redirect('dashboard')
  res.render('login')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), (req, res) => {
  res.redirect('/dashboard')
})

// Si llega porque logeó mal
app.get('/retrylogin', (req, res) => {
  res.render("login", {
    retry: true
  })
})

app.get('/signup', (req, res) => {
  if (req.user) //si ya esta logeado y entra aca lo mandamos al dash
    res.redirect('dashboard')
  res.render('signup')
})

app.post('/signup', passport.authenticate('register', { failureRedirect: '/retrysignup' }), (req, res) => {
  res.redirect('/dashboard')
})

app.get('/retrysignup', (req, res) => {
  res.render("signup", {
    retry: true
  })
})

app.get('/logout', (req, res) => {
  nameLogout = req.user.username
  req.logout((err) => {
    if (err) {
      res.redirect('/login')
    }
    else
      res.render("logout", {
        nameLogout
      })
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