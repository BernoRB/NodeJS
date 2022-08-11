const ProductsService = require("../services/product")
const ProductDTO = require("../dto/product")

const productService = new ProductsService()

const getProducts = async (req, res) => {
    const result = await productService.getProducts()
    const resultsDTO = result.map((p) => new ProductDTO(p))
    return res.status(200).json(resultsDTO)
}

const saveProducts = async (req, res) => {
    const result = await productService.addProduct(req.body)
    return res.status(200).json({
        message: 'Agregado producto',
        product: result
    })
}

const modifyProducts = async (req, res) => {
    const result = await productService.modifyProducts(req.params.id, req.body)
    return res.status(200).json({
        message: 'Editado producto',
        product: result
    })
}

const deleteProducts = async (req, res) => {
    const products = await productService.deleteProducts(req.params.id)
    return res.status(200).json({
        message: 'Eliminado producto',
        products
    })
}

module.exports = { getProducts, saveProducts, modifyProducts, deleteProducts }
