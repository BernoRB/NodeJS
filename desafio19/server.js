require("dotenv").config()
const connectMongo = require("./src/utils/connectMongo")
const express = require("express")
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
app.use(express.json())

const persistence = process.env.PERSISTENCE || process.argv.slice(2)

const productsRouter = require("./src/routes/products")
app.use("/productos", productsRouter)

if (persistence == 'MONGO') {
    const mongoDB = new connectMongo()
    mongoDB.init()
}


const { getProducts, saveProducts, modifyProducts, deleteProducts } = require('./src/controllers/productGql')

const schema = buildSchema(`
    type Product {
        id: Int
        title: String
        category: String
        price: Int
    }
    input ProductInput {
        title: String
        category: String
        price: Int
    }
    type Query {
        getProducts: [Product],
    }
    type Mutation {
        saveProducts(datos: ProductInput): Product,
        modifyProducts(id: Int, datos: ProductInput): Product
        deleteProducts(id: Int): Product
    }
`)

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        getProducts,
        saveProducts,
        modifyProducts,
        deleteProducts
    },
    graphiql: true,
})
)














const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})


module.exports = { app }