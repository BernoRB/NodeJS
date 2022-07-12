const containerArchivo = require('../containers/containerArchivo')

class productsDaoArchivo extends containerArchivo {
    constructor() {
        super('prodsDB');
    }

    async checkId() {
        const products = await this.getAll()
        if (products.length > 0) {
            return parseInt(products[products.length - 1].id) + 1;
        }
        return 1
    }

    async saveProduct(product) {
        try {
            product.id = await this.checkId()
            const timestamp = new Date().toLocaleString()
            product.timestamp = timestamp
            await this.save(product)
        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = { productsDaoArchivo }