const express = require("express")
const router = express.Router()
const { init, privateChat } = require('../controllers/chats.controller')
const { isLogged } = require('../utils/middlewares/loggedmw')

//Ruta chat
router.get('/', isLogged, init)
router.get('/email', isLogged, privateChat)

module.exports = router