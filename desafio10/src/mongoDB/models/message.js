const { Schema, model } = require("mongoose")
const mensajeCollection = "mensajes"

const mensajeSchema = new Schema({
  autor: {
    id: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
  },
  text: {
    type: String,
    required: true
  },
  fecha: {
    type: Date
  }
})

module.exports = model(mensajeCollection, mensajeSchema)
