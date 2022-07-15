const socket = io()

// Obtengo y emito nuevo producto
const formProds = document.getElementById('formProds')
formProds.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const newProduct = {
    title: data.get('title'),
    price: data.get('price'),
    thumbnail: data.get('thumbnail')
  }
  formProds.reset()
  socket.emit("new-product", newProduct)
})

// Obtengo y emito nuevo mensaje
const formMsg = document.getElementById('formMsg')
formMsg.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const newMessage = {
    autor: {
      mail: data.get('mail'),
      nombre: data.get('nombre'),
      apellido: data.get('apellido'),
      edad: data.get('edad'),
      alias: data.get('alias'),
      avatar: data.get('avatar'),
    },
    mensaje: data.get('mensaje'),
  }
  socket.emit('nuevo-mensaje', newMessage)
  document.getElementById('mensaje').value = '' //solo borro el mensaje por si sigue enviando el mismo user
})

// Funcion que renderiza productos
const renderProds = async (products) => {
  const template = await fetch('/layouts/prods.hbs')
  const textTemplate = await template.text()
  const hasProds = products.length > 0
  const functionTemplate = Handlebars.compile(textTemplate)
  const html = functionTemplate({ products, hasProds })
  document.getElementById('divProds').innerHTML = html
}

// Funcion que renderiza mensajes
const renderMsgs = async (mensajes) => {
  const template = await fetch('/layouts/msgs.hbs')
  const textTemplate = await template.text()
  const functionTemplate = Handlebars.compile(textTemplate)
  const html = functionTemplate({ mensajes })
  document.getElementById('divMsgs').innerHTML = html
}

// Escucha que vino un producto y lo renderiza
socket.on('products', (data) => renderProds(data))

// Escucha que vino un mensaje, lo denormaliza y lo renderiza
socket.on('mensajes', (mensajes) => {-
  renderMsgs(mensajes)
})