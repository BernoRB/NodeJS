const express = require('express')
const { Router } = express

const router = Router()
const products = require('../controllers/controllerProds')

router.get('/', products.generateProducts)

module.exports = router