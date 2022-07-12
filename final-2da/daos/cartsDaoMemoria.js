const containerMemoria = require('../containers/containerMemoria')
const { productsDaoMemoria } = require('../daos/productsDaoMemoria')
const productDao = new productsDaoMemoria()
const { CARTS_MEM } = require('../config')

class cartsDaoMemoria extends containerMemoria {
    constructor() {
        super(CARTS_MEM)
    }

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
        cart.products = []
        await this.save(cart)
        return cart.id
    }

    // Agrego productos al carrito
    async addToCart(idCart, idProd) {
        const prodToAdd = await productDao.getById(idProd)
        if (prodToAdd) {
            return await this.updatePush(prodToAdd, idCart, 'products')
        }
        throw new Error('No existe un producto con ese ID')
    }

    // Muestro productos de carrito
    async getByIdCart(idCart) {
        const cart = await this.getById(idCart)
        return cart.products
    }
    
    // Elimino productos del carrito
    async deleteFromCart(idCart, idProd) {
        this.updatePull(idCart, idProd)
    }

}

module.exports = { cartsDaoMemoria }