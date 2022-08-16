const ProductsService = require("../services/product")
const ProductDTO = require("../dto/product")

const productService = new ProductsService()

const getProducts = async () => {
    const result = await productService.getProducts()
    return resultsDTO = result.map((p) => new ProductDTO(p))
}

const saveProducts = async ({ datos }) => {
    return await productService.addProduct(datos)
}

const modifyProducts = async ({ id, datos }) => {
    return await productService.modifyProducts(id, datos)
}

const deleteProducts = async ({ id }) => {
    return await productService.deleteProducts(id)
}

module.exports = { getProducts, saveProducts, modifyProducts, deleteProducts }