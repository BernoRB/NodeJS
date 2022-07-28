const passport = require('passport')
const express = require("express")
const router = express.Router()

router.get('/', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    res.redirect("/dashboard")
})

router.get('/dashboard', (req, res) => {
    if (req.user) {
        res.render("dash", {
            username: req.user.username,
            email: req.user.email,
            loggedIn: true
        })
    } else
        res.redirect('/login')
})

router.get('/login', (req, res) => {
    if (req.user)
        res.redirect('dashboard')
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), (req, res) => {
    res.redirect('/dashboard')
})

// Si llega porque logeó mal
router.get('/retrylogin', (req, res) => {
    res.render("login", {
        retry: true
    })
})

router.get('/signup', (req, res) => {
    if (req.user)
        res.redirect('dashboard')
    res.render('signup')
})

router.post('/signup', passport.authenticate('register', { failureRedirect: '/retrysignup' }), (req, res) => {
    res.redirect('/dashboard')
})

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