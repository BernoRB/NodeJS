require("dotenv").config()
const express = require("express")
const path = require("path")
const { Server: IOServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const { engine } = require("express-handlebars")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

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
  socket.emit("mensajes", await messagesDB.getAllMessages())

  socket.on("nuevo-mensaje", async (newMessage) => {
    await messagesDB.addMessage(newMessage)
    io.sockets.emit("mensajes", await messagesDB.getAllMessages())
  })

})