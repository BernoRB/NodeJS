const passport = require('passport')
const express = require("express")
const router = express.Router()
const { addProducts, getProducts, deleteProducts }  = require('../controllers/controllerProds')



// Productos (luego pasar a ruta PRODUCTOS)

router.get('/', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    res.redirect("/productos")
})

// Trae los productos y los renderiza en dashboard
router.get('/productos/:id?', getProducts)

// Renderiza vista para agregar productos
router.get('/addProd', (req, res) => {
    res.render('addProd')
})

router.post('/addProd', addProducts)

//HACIENDO
router.delete('/productos/:id?', deleteProducts)






// Login signup logout

router.get('/login', (req, res) => {
    if (req.user)
        res.redirect('productos')
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/retrylogin' }), (req, res) => {
    res.redirect('/productos')
})

router.get('/retrylogin', (req, res) => {
    res.render("login", {
        retry: true
    })
})

router.get('/signup', (req, res) => {
    if (req.user)
        res.redirect('productos')
    res.render('signup')
})

router.post('/signup', passport.authenticate('register', { failureRedirect: '/retrysignup' }), (req, res) => {
    res.redirect('/productos')
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