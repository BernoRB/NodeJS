const containerMongo = require('../containers/containerMongo')
const cartModel = require('../models/cart')
const { productsDaoMongo } = require('../daos/productsDaoMongo')
const productDao = new productsDaoMongo()

class cartsDaoMongo extends containerMongo {
    constructor() {
        super(cartModel)
    }

    // Si bien Mongo asigna un _id yo le asigno otro numero corto consecutivo para luego poder ubicarlo pot mi ID.
    async checkId() {
        const carts = await this.getAll()
        if (carts.length > 0) {
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
        return cart.id
    }

    // Agrego productos al carrito
    async addToCart(idCart, idProd) {
        const prodToAdd = await productDao.getById(idProd)
        console.log(prodToAdd)
        if(prodToAdd){
            return await this.updatePush(prodToAdd, idCart, 'products')
        }
        throw new Error('No existe un producto con ese ID')
    }

    // Elimino productos del carrito
    async deleteFromCart(idCart, idProd) {
        this.updatePull(idCart, idProd, 'products')
    }

    // Devuelve solo los productos del cart
    async getByIdCart(id) {
        const cart = await this.getById(id)
        return cart.products
    }

}

module.exports = { cartsDaoMongo }