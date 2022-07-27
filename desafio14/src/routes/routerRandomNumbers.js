const express = require("express")
const router = express.Router()
const randomNumbers = require('../controllers/controllerRandom')

router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.get('/randoms', randomNumbers.getData)


module.exports = router