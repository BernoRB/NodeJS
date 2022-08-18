const session = require('express-session')
const MongoStore = require('connect-mongo')

const baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
    mongoOptions: {        useNewUrlParser: true,        useUnifiedTopology: true,    },
    secret: 'f1n4lc0d3r',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600_000 }
})

module.exports = baseSession