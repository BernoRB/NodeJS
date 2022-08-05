function toggleform() {
  const container = document.querySelector('.container');
  container.classList.toggle('active');
}



//const socket = io()

// Obtengo y emito nuevo producto
/*
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
*/

// Funcion que renderiza productos
/*
const renderProds = async (products) => {
  const template = await fetch('/layouts/prods.hbs')
  const textTemplate = await template.text()
  const hasProds = products.length > 0
  const functionTemplate = Handlebars.compile(textTemplate)
  const html = functionTemplate({ products, hasProds })
  document.getElementById('divProds').innerHTML = html
}
*/

// Escucha que vino un producto y lo renderiza
//socket.on('products', (data) => renderProds(data))
