const { faker } = require("@faker-js/faker")

const { tableExists, getAll, createTable, addProd } = require("./controllerDBprods")

faker.locale = "es"
const getAllProducts = async () => {
  try {
    const exists = await tableExists()
    if (exists) {
      return await getAll()
    }
    await createTable()
  } 
  catch (error) {
    throw error
  }
}

const addProduct = async (newProduct) => {
  try {
    const exists = await tableExists()
    if (!exists) await createTable()
    await addProd(newProduct)

    return "Nuevo mensaje agregado"
  } 
  catch (error) {
    throw error
  }
}

// Genera productos falsos y renderiza la vista
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
