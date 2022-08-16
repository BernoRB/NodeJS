const ProductMongo = require("../models/productMongo")

class Product {
    constructor() {
        this.model = ProductMongo
    }

    async getAll() {
        return await this.model.find()
    }

    async save(product) {
        return await this.model.create(product)
    }

    async modify(id, product) {
        // Modify no implementado, en desafio 17 no lo use y en desafio 18 hago las pruebas de Axios con JSON
    }

    async delete(id) {
        // Delete no implementado, en desafio 17 no lo use y en desafio 18 hago las pruebas de Axios con JSON
    }

}

module.exports = Product
