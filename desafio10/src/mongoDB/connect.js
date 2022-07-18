const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect("mongodb://localhost:27017/desafio10sessions", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


db.once("open", () => {
  console.log("MongoDB conectado a la DB")
})

db.on("error", (err) => {
  console.log(err)
})
