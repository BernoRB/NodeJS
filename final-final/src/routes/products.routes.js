const express = require("express")
const router = express.Router()
const { getProducts, deleteProducts, renderAddProducts, 
        addProducts, modifyProducts, showByCategory 
    }  = require('../controllers/products.controller')
const { createCart } = require('../controllers/carts.controller')
const { isAdmin } = require('../utils/middlewares/isAdmin')
const { imageUpload } = require('../utils/multer')
const { isLogged } = require('../utils/middlewares/loggedmw')

//Ruta /productos
router.get('/addProd', [ isAdmin, isLogged ], renderAddProducts)
router.post('/addProd', [
    imageUpload.single('thumbnail'),
    isAdmin 
    ], addProducts)
router.get('/:id?', [ isLogged, createCart ], getProducts)
router.delete('/:id?', isAdmin, deleteProducts)      //Sin front (no solicitado)
router.put('/:id', isAdmin, modifyProducts)          //Sin front (no solicitado)
router.get('/categoria/:categoria', isLogged, showByCategory)

module.exports = router