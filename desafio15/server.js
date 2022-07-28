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

const logger = require('./src/utils/logger') // Desafio14 logger

// Yargs desafio 12, 13, 14
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
    },
    'gzip': {
        alias: 'g',
        describe: 'true to activate gzip compression',
        default: false
    }
})
    .argv

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


// Sessions, passport
let baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    secret: 'Desafio13',
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



// Desafio 14 gzip
if (argv.gzip) {
    const compression = require('compression')
    app.use(compression())
}


// Fork o cluster desafio 13
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




// Desafio 14: middlewares log4js
function mwLogger(req, res, next){
    logger.loggerConsole.info(`URL: ${req.url}, METODO: ${req.method}`)
    next()
}

// Ruta desafio 12 api/randoms
const router = require('./src/routes/routerRandomNumbers')
app.use('/api', mwLogger, router)

// Ruta info desafio 12 y 13
app.get('/info', mwLogger, (req, res) => {
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

// Rutas de la pagina general
app.get('/', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    res.redirect("/dashboard")
})

app.get('/dashboard', mwLogger, (req, res) => {
    if (req.user) {
        res.render("dash", {
            username: req.user.username,
            email: req.user.email,
            loggedIn: true
        })
    } else
        res.redirect('/login')
})

app.get('/login', mwLogger, (req, res) => {
    if (req.user)
        res.redirect('dashboard')
    res.render('login')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), (req, res) => {
    res.redirect('/dashboard')
})

// Si llega porque logeó mal
app.get('/retrylogin', mwLogger, (req, res) => {
    res.render("login", {
        retry: true
    })
})

app.get('/signup', mwLogger, (req, res) => {
    if (req.user)
        res.redirect('dashboard')
    res.render('signup')
})

app.post('/signup', passport.authenticate('register', { failureRedirect: '/retrysignup' }), (req, res) => {
    res.redirect('/dashboard')
})

app.get('/retrysignup', mwLogger, (req, res) => {
    res.render("signup", {
        retry: true
    })
})

app.get('/logout', mwLogger, (req, res) => {
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

// Desafio 14: loggeamos los not found
app.get('*', (req, res) => {
    logger.loggerWarn.warn(`URL: ${req.url}, METODO: ${req.method}`)
    res.json('404')
})