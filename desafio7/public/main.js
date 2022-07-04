const socket = io.connect()

// Listeners
document.getElementById('btnFormProd').addEventListener('click', emitProd)
document.getElementById('btnFormMsg').addEventListener('click', emitMsg)

// --------- //
// PRODUCTOS //
// --------- //

// Emite el nuevo producto
function emitProd() {
    const name  = document.getElementById('nameProd').value
    const price = document.getElementById('priceProd').value
    const thumb = document.getElementById('thumbProd').value
    if(name && price) { // Valido que no esté vacío
        socket.emit('new-product', { name: name, price: price, thumb: thumb })
    }
}

// Recibe y renderiza los productos
socket.on('products', async products => {
    const response = await fetch('partialView/prodsTable.hbs') // Traemos la tabla vacía hbs
    const htmlView  = await response.text()
    const productsTemplate = Handlebars.compile(htmlView)
    const html = productsTemplate({ products })
    document.getElementById('productsList').innerHTML = html
})


// ------ //
//  CHAT  //
// ------ //

// Emite un nuevo mensaje
function emitMsg() {
    const message = {
        msgEmail   : document.getElementById('emailChat').value,
        msgDate    : new Date().toLocaleString(),
        msgContent : document.getElementById('messageChat').value
    }

    document.getElementById('messageChat').value = ''
    if(message.msgEmail && message.msgContent) {
        socket.emit('new-message', message)
    }
}

// Recibe y renderiza los mensajes
socket.on('messages', async messages => {
    const htmlMessages = messages.map(message => {
        return (`
            <div class="ms-3">
                <b    style="color:blue;" >${message.msgEmail}   </b>
                <span style="color:brown;">[${message.msgDate}]: </span>
                <i    style="color:green;">${message.msgContent} </i>
            </div>
        `)
    }).join('');
    document.getElementById('messagesChat').innerHTML = htmlMessages
})