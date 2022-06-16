// Acá va lo necesario para capturar productos por Form y cargarlos

const form = document.querySelector('form.form1')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const product = {}
    product.name = formData.get('name')
    product.price = formData.get('price')
    product.thumbnail = formData.get('thumbnail')
    // Enviamos el producto a la api
    const response = await fetch('/api/productos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify(product)
    })
    // Mostramos el ID con el que fue agregado como pide la consigna
    const rta = await response.json()
    alert(rta)
    form.reset()
})