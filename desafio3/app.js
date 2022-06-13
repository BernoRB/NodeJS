const File = require('./classes.js')
const express = require('express')
const app = express()
const PORT = 8080

let products = new File('./products.txt')

// En inicio un indice
app.get('/', (req, res) => {
  res.send(`
      <h1 style="font-family: Verdana">
        <i>Index</i> 
      </h1> 
      <ul> 
        <li> 
          <a style="text-decoration: none; font-size: 1.5em; font-family: Verdana" href="/products"> Products </a> 
        </li>
        <li>
          <a style="text-decoration: none; font-size: 1.5em; font-family: Verdana" href="randomProduct"> Random Product </a> 
        </li> 
      </ul>
      `)
})

// En /products muestra la lista de productos
app.get('/products', (req, res) => {
  res.json(products.getAll())
})

// En /randomProduct muestra un producto al azar
app.get('/randomProduct', (req, res) => {
  res.send(products.getRandom())
})

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))