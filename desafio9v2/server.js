require("dotenv").config()
const express = require("express")
const path = require("path")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { schema, normalize } = require("normalizr")
const { engine } = require("express-handlebars")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Rutas prods nuevas
const router = require("./src/routes/routeProds")
app.use("/api/productos-test", router)

const products = require("./src/controllers/controllerProds")
const messagesDB = require("./src/controllers/controllersMsgs")

// Views engine
app.set("views", path.join(__dirname, "public"))
app.engine(
  "hbs",
  engine({
    defaultLayout: "index.hbs",
    extname: ".hbs",
  })
)
app.set("view engine", "hbs")


const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))


// Normalizr
const normalizeData = (dataToN) => {
  const messages = JSON.parse(JSON.stringify(dataToN))
  const autorSchema = new schema.Entity("autors")
  const messageSchema = new schema.Entity("mensajes",
    { autor: autorSchema },
    { idAttribute: "_id" } )
  const global = new schema.Entity("global", 
    { messages: [messageSchema] } )
  const data = { id: "mensajes", messages }
  const dataNormalized = normalize(data, global)

  return dataNormalized
}

// Socket
io.on("connection", async (socket) => {

  // Productos
  socket.emit("products", await products.getAllProducts())
  socket.on("new-product", async (newProduct) => {
    await products.addProduct(newProduct)
    const prods = await products.getAllProducts()
    io.sockets.emit("products", prods)
  })

  // Chat
  const dataNormalizr = normalizeData(await messagesDB.getAllMessages())
  socket.emit("mensajes", dataNormalizr)

  socket.on("nuevo-mensaje", async (newMessage) => {
    await messagesDB.addMessage(newMessage)
    const dataNormalizr = normalizeData(await messagesDB.getAllMessages())
    io.sockets.emit("mensajes", dataNormalizr)
  })

})