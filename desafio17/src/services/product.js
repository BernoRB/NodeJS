const PersistenceFactory = require("../dao/persistenceFactory")

class ProductService {

    constructor() {
        this.productDAO
        this.init()
    }

    async init() {
        this.productDAO = await PersistenceFactory.getPersistence()
    }

    async getProducts() {
        return await this.productDAO.getAll()
    }

    async addProduct(product) {
        return await this.productDAO.save(product)
    }
    
}

module.exports = ProductService
