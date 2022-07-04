const Product = require("../models/productClass")
const dbControl = require("./dbController")
const { options } = require('../options/mariaDB')

const dbC = new dbControl(options, 'products')


function createTable() {
    dbC.createTable()
}

createTable()

function save(name, price, thumb) {
    try {
        const newProd = new Product(name, price, thumb)
        dbC.insert(newProd)
    } catch (error) {
        console.log('Ocurrio un error al intentar agregar el producto')
    }
    return dbC.selectAll()
}

function getAll() {
    try {
        return dbC.selectAll()
    } catch (error) {
        return('Hubo un error al intentar traer los productos', error)
    }
}

module.exports = { save, getAll }