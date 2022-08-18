const express = require("express")
const router = express.Router()
const { init } = require('../controllers/chats.controller')
const { isLogged } = require('../utils/middlewares/loggedmw')
const { isAdmin } = require('../utils/middlewares/isAdmin')


//Ruta /chat
router.get('/', isLogged, init)

module.exports = router