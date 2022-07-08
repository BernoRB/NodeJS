const containerMongo = require('../containers/containerMongo')
const cartModel = require('../models/cart')

class cartsDaoMongo extends containerMongo {
    constructor() {
        super(cartModel)
    }

    // Si bien Mongo asigna un _id yo le asigno otro numero corto consecutivo de la misma forma que 
    // en firebase para luego poder ubicarlo con un getById...
    async checkId(){
        const carts = await this.getAll()
        if(carts.length > 0) {
          return parseInt(carts[carts.length - 1].id) + 1;
        }
        return 1
      }
    
    // Crea un carrito, con id y timestamp, vacio de productos
    async createCart(cart) {
        cart.id = await this.checkId()
        const timestamp = new Date().toLocaleString()
        cart.timestamp = timestamp
        await this.save(cart)
    }
    
}

module.exports = { cartsDaoMongo }