const express = require("express")
const router = express.Router()
const { getProducts, deleteProducts, addProducts, modifyProducts }  = require('../controllers/products.controller')
const { createCart } = require('../controllers/carts.controller')
const { isAdmin } = require('../middlewares/isAdmin')

//Ruta /productos
router.get('/addProd', isAdmin, (req, res) => {    res.render('addProd') })
router.post('/addProd', isAdmin, addProducts)
router.get('/:id?', createCart, getProducts)
router.delete('/:id?', isAdmin, deleteProducts)      //Sin front
router.put('/:id', isAdmin, modifyProducts)          //Sin front


module.exports = router