const productsController = require("../controllers/product")

const router = (app, opts, done) => {
    app.get("/", productsController.getProducts)
    app.post("/", productsController.saveProducts)
    app.put("/:id", productsController.modifyProducts)
    app.delete("/:id", productsController.deleteProducts)
    done()
}

module.exports = router