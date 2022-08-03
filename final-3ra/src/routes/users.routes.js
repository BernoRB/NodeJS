const passport = require('passport')
const express = require("express")
const router = express.Router()
const { newUserMail } = require('../controllers/communications.controller')

router.get('/', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    res.redirect("/productos")
})

router.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/productos')
    } else {
        res.render('login')
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), (req, res) => {
    res.redirect('/productos')
})

router.get('/retrylogin', (req, res) => {
    res.render("login", {
        retry: true
    })
})

router.post('/signup', passport.authenticate('register', { failureRedirect: '/retrysignup' }), newUserMail)

router.get('/retrysignup', (req, res) => {
    res.render("signup", {
        retry: true
    })
})

router.get('/logout', (req, res) => {
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

module.exports = router