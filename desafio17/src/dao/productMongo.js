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

}

module.exports = Product
