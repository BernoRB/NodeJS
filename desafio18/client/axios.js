const axios = require('axios')
const API_URL = "http://localhost:8080/productos"

async function getAll() {
    try {
        const response = await axios.get(API_URL)
        console.log(response.data)
    } catch (error) {
        console.log(`Hubo un error al intentar obtener los productos: ${error}`)
    }
}

async function postNew() {
    try {
        const response = await axios.post(API_URL, {
            id: 4,
            title: "Producto Agregado",
            category: "Malbec",
            price: 8000,
        })
        const data = await response.data;
        console.log(data)
    } catch (error) {
        console.log(`Hubo un error al intentar agregar un producto: ${error}`)
    }
}

async function updateOne() {
    try {
        const response = await axios.put(`${API_URL}/1`, {
            id: 1,
            title: "Titulo editado",
            category: "Categoria editada",
            price: 1234,
        })
        const data = await response.data
        console.log(data)
    } catch (error) {
        console.log(`Hubo un error al intentar actualizar el producto: ${error}`)
    }
}


async function deleteOne() {
    try {
        const response = await axios.delete(`${API_URL}/2`)
        const data = await response.data
        console.log(data)
    } catch (error) {
        throw `Hubo un error al intentar borrar un producto: ${error}`
    }
}


module.exports = { getAll, updateOne, deleteOne, postNew }