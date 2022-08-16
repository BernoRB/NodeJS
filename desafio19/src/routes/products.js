const express = require("express")
const router = express.Router()
const productsController = require("../controllers/product")

router.get("/", productsController.getProducts)
router.post("/", productsController.saveProducts)
router.put("/:id", productsController.modifyProducts)
router.delete("/:id", productsController.deleteProducts)



module.exports = router