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


module.exports = { getAllProducts, addProduct }
