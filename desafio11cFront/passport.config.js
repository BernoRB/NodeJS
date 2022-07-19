const passport = require('passport')
const local = require('passport-local')
const { users } = require('./src/models/User.js')
const { createHash, isValidPassword } = require('./utils.js')

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let user = await users.findOne({ username })
                    if (user) return done(null, false) // lo encontro, no registra
                    const newUser = {
                        username,
                        password: createHash(password),
                        email: req.body.email
                    }
                    try {
                        let result = await users.create(newUser)
                        return done(null, result)
                    } catch(err) {
                        done(err)
                    }
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ username })
                    if (!user) return done(null, false)//, { message: "User does not exists"}) // no lo encontro, no existe
                    if (!isValidPassword(user, password)) return done(null, false)//, {message: "Invalid password"}) // la pw esta mal
                    return done(null, user) // todo ok vuelve el user
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    })
}

module.exports = { initializePassport }