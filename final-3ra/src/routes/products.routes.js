const express = require("express")
const router = express.Router()
const { getProducts, deleteProducts, renderAddProducts, addProducts, modifyProducts }  = require('../controllers/products.controller')
const { createCart } = require('../controllers/carts.controller')
const { isAdmin } = require('../middlewares/isAdmin')
const { imageUpload } = require('../utils/multer')

//Ruta /productos
router.get('/addProd', isAdmin, renderAddProducts)
router.post('/addProd', [
    imageUpload.single('thumbnail'),
    isAdmin 
    ], addProducts)
router.get('/:id?', createCart, getProducts)
router.delete('/:id?', isAdmin, deleteProducts)      //Sin front
router.put('/:id', isAdmin, modifyProducts)          //Sin front


module.exports = router