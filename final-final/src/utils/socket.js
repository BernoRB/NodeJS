module.exports = (io) => {
    io.on('connection', (socket) => {

        console.log('New user connected')

        socket.on('nuevo mensaje', (msj) => {
            io.emit('nuevo mensaje', msj)
        })

        socket.on('disconnect', function () {
            console.log('Usuario desconectado')
        })

    })
}