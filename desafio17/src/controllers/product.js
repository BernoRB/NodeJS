const ProductsService = require("../services/product")
const ProductDTO = require("../dto/product")

const productService = new ProductsService()

const getProducts = async (req, res) => {
    const result = await productService.getProducts()
    const resultsDTO = result.map((p) => new ProductDTO(p))
    res.send(resultsDTO)
}


const saveProducts = async (req, res) => {
    const result = await productService.addProduct(req.body)
    res.send(result)
}

module.exports = { getProducts, saveProducts }
