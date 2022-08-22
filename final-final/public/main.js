function toggleform() {
    const container = document.querySelector('.container')
    container.classList.toggle('active')
}

const socket = io()

socket.on('listar mensajes', (msjs) => {
    const divHtml = document.getElementById('listado-msjs')
    if (divHtml) {
        const html = generateHtmlRtas(msjs)
        divHtml.innerHTML = html
    }

})

socket.on('ver respuestas', (msjs) => {
    const html = generateHtmlRtas(msjs)
    document.getElementById('listado-msjs-y-rtas').innerHTML = html
})

function enviarMensaje() {
    const nuevoMsj = document.getElementById('nuevo-msj').value
    const mail = document.getElementById('mailPChatSocket').innerHTML
    document.getElementById('nuevo-msj').value = ''
    socket.emit('nuevo mensaje', { msg: nuevoMsj, mail: mail })
}

function enviarRespuesta() {
    const nuevoMsj = document.getElementById('nueva-rta').value
    const mail = document.getElementById('mail-rta').value
    document.getElementById('nueva-rta').value = ''
    socket.emit('nueva respuesta', { msg: nuevoMsj, mail: mail })
}

function verRespuestas() {
    const mail = document.getElementById('mailPChatSocket').innerHTML
    socket.emit('ver respuestas', mail)
}


function generateHtmlRtas(msjs) {
    let html = ''
    msjs.forEach(element => {
        html += element.type == 'usuario' ? `
            <div>
                <span class="fw-bold text-primary">${element.email}</span>
                [<span class="text-muted">${element.date}</span>]:
                <span class="fst-italic">${element.body}</span>
            </div>
            ` : `
            <div>
                <span class="fw-bold" style='color: red;'>RESPUESTA ADMIN:</span>
                [<span class="text-muted">${element.date}</span>]:
                <span class="fst-italic">${element.body}</span>
            </div>
            `;

    })
    return html
}