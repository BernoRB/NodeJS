const { fork } = require('child_process')

const getData = (req, res) => {
    let cant = req.query.cant || 100_000_000
    const forkedProcess = fork('./src/utils/childRandom.js')
    // Enviamos al child la variable con la que va a hacer lo suyo
    forkedProcess.send(cant)
    // Recibimos del child la respuesta //dato: TIENE que ser message, no es a tu gusto
    forkedProcess.on('message', (respuesta) => {
        return res.send(respuesta)
    })
}

module.exports = { getData }