const db = require('../../config')
const tabla = 'productos'

const tableExists = async () => {
    return await db.schema.hasTable(tabla)
}

const createTable = async () => {
    try {
        await db.schema.createTable(tabla, table => {
                table.increments()
                table.text('title', 255)
                table.real('price')
                table.text('thumbnail', 255)
                table.text('fecha', 255)
            })            
    } 
    catch (error) { 
        throw error 
    }
}

const addProd = async (newProd) => {
    try {
        const { title, price, thumbnail } = newProd
        const fecha = new Date().toLocaleString()
        await db.insert({ title, price, thumbnail, fecha }).into(tabla)
    } 
    catch (error) { 
        throw error 
    }
}

const getAll = async () => {
    try {
        return await db.select().table(tabla)
    } 
    catch (error) { 
        throw error 
    }
}

module.exports = { tableExists, createTable, addProd, getAll }