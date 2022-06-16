const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()
const PORT = 8080
const functions = require("./functions");

// Configuración static
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


// Endpoint que agrega productos ficticios para facilitar las pruebas
router.get('/cargaFalsa', (req, res) => {
    functions.save('Las Moras', 600, 'www.imgimg.com')
    functions.save('Otro loco mas', 500, 'www.imgimg.com')
    functions.save('Rutini', 1100, 'www.imgimg.com')
    res.json("Productos de prueba cargados OK")
})


// Devuelve todos los productos
router.get('/', (req, res) => {
    res.json(functions.getAll())
})


// Devuelve producto según su ID
router.get('/:id', (req, res) => {
    res.json(functions.getById(req.params.id))
})


// Recibe y agrega un producto y lo devuelve con su ID asignado
// El código para agregar por FORM se puede ver en /src/public/formSave.js
router.post('/', (req, res) => {
    let data = req.body
    let rta = functions.save(data.name, data.price, data.thumbnail)
    res.json(`Producto agregado correctamente con el id ${rta}`)
})


// Recibe y actualiza un producto según su ID
/* Body JSON de ejemplo para modificar los datos del producto 2:
{
    "name" : "Otro loco mas",
    "price" : 1900,
    "thumbnail" : "www.imgimg.com"
}  */
router.put('/:id', (req, res) => {
    let data = req.body
    let rta = functions.modify(req.params.id, data.name, data.price, data.thumbnail)
    res.json(rta)
})


// Elimina un producto según su ID
router.delete('/:id', (req, res) => {
    res.json(functions.deleteById(req.params.id))
})


app.use('/api/productos', router)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

