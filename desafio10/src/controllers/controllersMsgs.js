require("../mongoDB/connect")
const Mensaje = require("../mongoDB/models/message")

const getAllMessages = async () => {
  return await Mensaje.find()
}

const addMessage = async (newMsg) => {
  const { autor, mensaje } = newMsg
  const newMensaje = new Mensaje({
    autor: {
      id: autor.mail, //la consigna pide que el ID sea el mail
      nombre: autor.nombre,
      apellido: autor.apellido,
      edad: autor.edad,
      alias: autor.alias,
      avatar: autor.avatar
    },
    text: mensaje,
    fecha: new Date(),
  })
  await newMensaje.save()
  return "Nuevo mensaje agregado"
}

module.exports = { addMessage, getAllMessages }
