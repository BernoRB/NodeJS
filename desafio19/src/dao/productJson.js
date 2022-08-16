const fs = require("fs")
const path = require("path")
const fileJsonName = process.env.FILE_JSON_NAME

class Product {
    constructor() {
        this.filePath = path.join('src', 'datafiles', fileJsonName)
        this.init()
    }

    async init() {
        if (!fs.existsSync(this.filePath)) {
            await fs.promises.writeFile(this.filePath, JSON.stringify([]))
            console.log('Persistencia: JSON FILE. Archivo creado.')
        }
        else
            console.log('Persistencia: JSON FILE. Archivo existente.')
    }

    async readFile() {
        const data = await fs.promises.readFile(this.filePath, "utf-8")
        return JSON.parse(data)
    }

    async getAll() {
        return await this.readFile()
    }

    async save(datos) {
        const products = await this.readFile()
        const product = {
            id : products.length == 0 ? 1 : products[products.length - 1].id + 1,
            title : datos.title,
            category : datos.category,
            price : datos.price
        }
        products.push(product)
        await fs.promises.writeFile(this.filePath, JSON.stringify(products))
        return (product)
    }

    async modify(id, datos) {
        const products = await this.readFile()
        const product = {
            id,
            title: datos.title,
            category: datos.category,
            price: datos.price
        }
        const i = parseInt(id) - 1
        products.splice(i, 1, product)
        await fs.promises.writeFile(this.filePath, JSON.stringify(products))
        return (product)
    }

    async delete(id) {
        const products = await this.readFile()
        const i = parseInt(id) - 1
        const deletedProduct = products[i]
        products.splice(i, 1)
        await fs.promises.writeFile(this.filePath, JSON.stringify(products))
        return (deletedProduct)
    }

}

module.exports = Product