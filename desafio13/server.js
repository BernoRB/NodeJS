require('dotenv').config()
const path = require("path")
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { initializePassport } = require('./src/utils/passport.config.js')

const cluster = require('cluster');
const core = require('os');

const products = require("./src/controllers/controllerProds")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")

const { engine } = require("express-handlebars")



// Yargs desafio 13
const yargs = require('yargs/yargs')(process.argv.slice(2))
const argv = yargs.options({
  'port': {
    alias: 'p',
    describe: 'provide a port, default 8080',
    default: '8080'
  },
  'mode': {
    alias: 'm',
    describe: 'mode: cluster or fork',
    default: 'fork'
  }
})
  .argv

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
//httpServer.listen(argv.port, () => console.log(`Servidor escuchando en el puerto ${argv.port}`))






// Sessions, passport
let baseSession = session({
  store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  secret: 'Desafio11',
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
app.set("views", path.join(__dirname, "public"))
app.set("view engine", "hbs")


// Socket
io.on("connection", async (socket) => {
  socket.emit("products", await products.getAllProducts())
  socket.on("new-product", async (newProduct) => {
    await products.addProduct(newProduct)
    const prods = await products.getAllProducts()
    io.sockets.emit("products", prods)
  })
})




if (argv.mode != 'fork') {
  if (cluster.isPrimary) {
    console.log(`Proceso principal ${process.pid}`)
    for (let i = 0; i < core.cpus().length; i++)
      cluster.fork()
    cluster.on('exit', (worker) => {
      cluster.fork()
    })
  } else
    httpServer.listen(argv.port, () => { console.log(`Escuchando en el puerto ${httpServer.address().port} proceso ID ${process.pid}`) })
} else
  httpServer.listen(argv.port, () => { console.log(`Escuchando en el puerto ${httpServer.address().port} proceso ID ${process.pid}`) })




// Router consigna desafio 12 y 13
const router = require('./src/routes/routerRandomNumbers')
app.use('/api', router)

// Ruta info desafio 12 y 13
app.get('/info', (req, res) => {
  const info = {
    arguments: process.argv.slice(2),
    platform: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage().rss,
    execPath: process.execPath,
    pid: process.pid,
    projPath: process.cwd(),
    qCpus: core.cpus().length
  }
  res.render("info", {
    info
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