const ProductsService = require("../services/product")
const ProductDTO = require("../dto/product")

const productService = new ProductsService()

const getProducts = async (request, reply) => {
    const result = await productService.getProducts()
    const resultsDTO = result.map((p) => new ProductDTO(p))
    return reply.status(200).send({ resultsDTO })
}

const saveProducts = async (request, reply) => {
    const result = await productService.addProduct(request.body)
    return reply.status(200).send({
        message: 'Agregado producto',
        product: result
    })
}

const modifyProducts = async (request, reply) => {
    const result = await productService.modifyProducts(request.params.id, request.body)
    return reply.status(200).send({
        message: 'Editado producto',
        product: result
    })
}

const deleteProducts = async (request, reply) => {
    const products = await productService.deleteProducts(request.params.id)
    return reply.status(200).send({
        message: 'Eliminado producto',
        products: products
    })
}

module.exports = { getProducts, saveProducts, modifyProducts, deleteProducts }
