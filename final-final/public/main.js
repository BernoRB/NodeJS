function toggleform() {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
}

const socket = io()

socket.on('nuevo mensaje', (msj) => {

    document.getElementById('listado-msjs').innerHTML += `<li> ${msj}`
})

function enviarMensaje() {
    const nuevoMsj = document.getElementById('nuevo-msj').value
    document.getElementById('nuevo-msj').value = ''
    socket.emit('nuevo mensaje', nuevoMsj)
}