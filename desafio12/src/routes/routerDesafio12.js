const express = require("express")
const router = express.Router()
const { fork } = require('child_process')

router.use(express.json())
router.use(express.urlencoded({extended:true}))


// Si bien la logica no deberia ir en el archivo de rutas, lo pongo aca para
// simplificar ya que es algo temporal para este desafio
// localhost:8080/randoms?cant=500000
router.get('/randoms', (req, res) => {
    let cant = req.query.cant || 100_000_000
    const forkedProcess = fork('./src/utils/childRandom.js')
    // Enviamos al child la variable con la que va a hacer lo suyo
    forkedProcess.send(cant)
    // Recibimos del child la respuesta //dato: TIENE que ser message, no es a tu gusto
    forkedProcess.on('message', (respuesta) => {
        return res.send(respuesta)
    })
})


module.exports = router