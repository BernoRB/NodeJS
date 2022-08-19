function toggleform() {
    const container = document.querySelector('.container')
    container.classList.toggle('active')
}

const socket = io()

socket.once('listar mensajes', (msjs) => {
    const html = generateHtml(msjs)
    document.getElementById('listado-msjs').innerHTML = html
})

socket.on('nuevo mensaje', (msjs) => {
    const html = generateHtml(msjs)
    document.getElementById('listado-msjs').innerHTML = html
})

function enviarMensaje() {
    const nuevoMsj = document.getElementById('nuevo-msj').value
    const mail = document.getElementById('mailPChatSocket').innerHTML
    document.getElementById('nuevo-msj').value = ''
    socket.emit('nuevo mensaje', { msg: nuevoMsj, mail: mail })
}

function generateHtml(msjs) {
    let html = ''
    msjs.forEach(element => {
        html += `
        <div>
            <span class="fw-bold text-primary">${element.email}</span>
            [<span class="text-muted">${element.date}</span>]:
            <span class="fst-italic">${element.body}</span>
        </div>
        `
    })
    return html
}