// Aca exportamos una instancia del socket para que pueda ser utilizado desde el controller
const socketio = require('socket.io')

let io
module.exports = {
    init(server) {
        io = socketio(server)
        return io
    },
    getIO() {
        if (!io) {
            throw new Error("Can't get io instance before calling .init()")
        }
        return io
    }
}