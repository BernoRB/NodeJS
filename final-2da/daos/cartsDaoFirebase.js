const containerFirebase = require('../containers/containerFirebase')

const { productsDaoFb } = require('../daos/productsDaoFirebase')
const productDao = new productsDaoFb()

class cartsDaoFb extends containerFirebase {
    constructor() {
        super('carts')
    }

    async checkId() {
        const carts = await this.getAll()
        if (carts.length > 0) {
            return parseInt(carts[carts.length - 1].id) + 1;
        }
        return 0
    }

    async createCart(cart) {
        const idCart = await this.checkId()
        const timestamp = new Date().toLocaleString()
        cart.timestamp = timestamp
        cart.products = []
        await this.save(cart, idCart)
    }

    // Agrego productos al carrito 
    async addToCart(idCart, idProd) {
        const prodToAdd = await productDao.getById(idProd)
        if (prodToAdd) {
            return await this.updatePush(prodToAdd, idCart, 'products')
        }
        throw new Error('No existe un producto con ese ID')
    }

    // Elimino productos del carrito
    async deleteFromCart(idCart, idProd) {
        const prodToDelete = await productDao.getById(idProd)
        this.updatePull(idCart, prodToDelete, 'products')
    }

    // Devuelve solo los productos del cart
    async getByIdCart(id) {
        const cart = await this.getById(id)
        return cart.data.products
    }

}

module.exports = { cartsDaoFb }