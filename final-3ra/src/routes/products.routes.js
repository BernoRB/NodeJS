const express = require("express")
const router = express.Router()
const { getProducts, deleteProducts, addProducts, modifyProducts }  = require('../controllers/products.controller')


//Ruta /productos
router.get('/addProd', (req, res) => {    res.render('addProd') })
router.post('/addProd', addProducts)
router.get('/:id?', getProducts)            //Sin front (pero al ser GET se puede probar por navegador)
router.delete('/:id?', deleteProducts)      //Sin front
router.put('/:id', modifyProducts)          //Sin front


module.exports = router