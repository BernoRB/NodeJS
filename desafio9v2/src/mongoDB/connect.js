const mongoose = require('mongoose')

const uri = "mongodb://127.0.0.1:27017/ecommpf"
const db = mongoose.connection

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

db.once("open", () => {
  console.log("MongoDB conectado a DB ", uri)
})

db.on("error", (err) => {
  console.log(err)
})
