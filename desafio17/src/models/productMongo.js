const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: Number
})

module.exports = mongoose.model("Product", productSchema)
