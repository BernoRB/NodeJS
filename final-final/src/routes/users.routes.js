const passport = require('passport')
const express = require("express")
const router = express.Router()
const { newUserMail } = require('../controllers/communications.controller')
const { imageUpload } = require('../utils/multer')
const { mainGet, loginGet, loginPost, retryLogin, retrySignup, myAccount, infoServer, logout } = require('../controllers/users.controller')
const { isLogged, isNotLogged } = require('../utils/middlewares/loggedmw')
const { isAdmin } = require('../utils/middlewares/isAdmin')

router.get('/', passport.authenticate('login', { failureRedirect: '/login' }), mainGet)
router.get('/login', isNotLogged, loginGet)
router.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), loginPost)
router.get('/retrylogin', isNotLogged, retryLogin)
router.post('/signup', [
    imageUpload.single('avatar'),
    passport.authenticate('register', { failureRedirect: '/retrysignup' }),
], newUserMail )
router.get('/retrysignup', isNotLogged, retrySignup)
router.get('/micuenta', isLogged, myAccount)
router.get('/infoServer', [ isLogged, isAdmin ] , infoServer)
router.get('/logout', isLogged, logout)

module.exports = router