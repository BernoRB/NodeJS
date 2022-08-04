const passport = require('passport')
const express = require("express")
const router = express.Router()
const { newUserMail } = require('../controllers/communications.controller')
const { imageUpload } = require('../utils/multer')
const { mainGet, loginGet, loginPost, retryLogin, retrySignup, logout } = require('../controllers/users.controller')

router.get('/', passport.authenticate('login', { failureRedirect: '/login' }), mainGet)
router.get('/login', loginGet)
router.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), loginPost)
router.get('/retrylogin', retryLogin)
router.post('/signup', [
    imageUpload.single('avatar'),
    passport.authenticate('register', { failureRedirect: '/retrysignup' }),
], newUserMail )
router.get('/retrysignup', retrySignup)
router.get('/logout', logout)

module.exports = router