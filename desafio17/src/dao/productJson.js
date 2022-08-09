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

    async save(product) {
        const products = await this.readFile()
        product.id = products.length == 0 ? 1 : products[products.length - 1].id + 1
        products.push(product)
        await fs.promises.writeFile(this.filePath, JSON.stringify(products))
        return product
    }

}

module.exports = Product