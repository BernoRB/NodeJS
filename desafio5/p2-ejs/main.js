const express = require('express')
const app = express()
const router = express.Router()
const PORT = 8080
const functions = require("./functions");
const path = require('path')

// Configuración static
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Ejs
app.set('views', './views');
app.set('view engine', 'ejs');

// Agrego producto
router.post('/', (req, res) => {
    let data = req.body
    functions.save(data.name, data.price, data.thumbnail)
    res.redirect('/')
})

// Devuelve todos los productos
router.get('/', (req, res) => {
    const products = functions.getAll()
    res.render('index', {
        products: products,
        qProducts: products.length
    })
})

// Atajo para cargar productos para facilitar pruebas
router.get('/cargaFalsa', (req, res) => {
    functions.save('Las Moras', 600, 'https://cdn1.iconfinder.com/data/icons/kitchen-and-food-2/44/wine-256.png')
    functions.save('Otro loco mas', 500, 'https://cdn1.iconfinder.com/data/icons/drink-beverage/512/22-wine-drink-bottle-glass-256.png')
    functions.save('Rutini', 1100, 'https://cdn0.iconfinder.com/data/icons/colored/94/Colored_Wine-256.png')
    res.redirect('/')
})

app.use('/productos', router)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

