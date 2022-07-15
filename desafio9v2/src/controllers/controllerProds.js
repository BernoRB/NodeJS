const { faker } = require("@faker-js/faker")

const { tableExists, getAll, createTable, addProd } = require("./controllerDBprods")

const getAllProducts = async () => {
  try {
    const exists = await tableExists()
    if (exists)
      return await getAll()
    await createTable()
  } 
  catch (error) {
    console.log(error)
  }
}

const addProduct = async (newProduct) => {
  try {
    const exists = await tableExists()
    if (!exists) await createTable()
    await addProd(newProduct)
  } 
  catch (error) {
    console.log(error)
  }
}

// Genera productos falsos y renderiza la vista
faker.locale = "es"
const generateProducts = (req, res) => {
  const products = []
  for (let index = 0; index < 5; index++) {
    products.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.business(),
    })
  }
  res.render("viewFakeProds", { products, hasProds: true })
}

module.exports = { getAllProducts, addProduct, generateProducts }
