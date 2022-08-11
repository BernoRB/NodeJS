class ProductDTO {
    constructor(product) {
        this.id = product.id
        this.title = product.title
        this.category = product.category
        this.price = product.price
    }
}

module.exports = ProductDTO
