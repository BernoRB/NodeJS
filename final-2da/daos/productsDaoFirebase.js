const containerFirebase = require('../containers/containerFirebase')

class productsDaoFb extends containerFirebase {
    constructor() {
        super('products')
    }

    async checkId(){
        const products = await this.getAll()
        if(products.length > 0) {
          return parseInt(products[products.length - 1].id) + 1;
        }
        return 1
      }
    
    async saveProduct(product) {
        const idProd = await this.checkId()
        const timestamp = new Date().toLocaleString()
        product.timestamp = timestamp
        await this.save(product, idProd)
    }
    
}

module.exports = { productsDaoFb }