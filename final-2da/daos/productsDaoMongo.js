const containerMongo = require('../containers/containerMongo')
const productModel = require('../models/product')

class productsDaoMongo extends containerMongo {
    constructor() {
        super(productModel)
    }

    // Si bien Mongo asigna un _id yo le asigno otro numero corto consecutivo de la misma forma que 
    // en firebase para luego poder ubicarlo con un getById...
    async checkId(){
        const products = await this.getAll()
        if(products.length > 0) {
          return parseInt(products[products.length - 1].id) + 1;
        }
        return 1
      }
    
    // Agregamos el id (el manual) y el timestamp y llamamos al container que guarda
    async saveProduct(product) {
        product.id = await this.checkId()
        const timestamp = new Date().toLocaleString()
        product.timestamp = timestamp
        await this.save(product)
    }
    
}

module.exports = { productsDaoMongo }