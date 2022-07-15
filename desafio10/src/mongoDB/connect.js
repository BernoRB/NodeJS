const mongoose = require('mongoose')

const uri = "mongodb://127.0.0.1:27017/desafio10prods"
const db = mongoose.connection

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

db.once("open", () => {
  console.log("MongoDB conectado a la DB")
})

db.on("error", (err) => {
  console.log(err)
})
