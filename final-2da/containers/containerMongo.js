const { MONGO_URI } = require('../config')
const mongoose = require('mongoose')

class containerMongo {
    constructor(model) {
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('Conectado a la base de datos'))
        this.model = model
    }

    async getAll() {
        return await this.model.find()
    }

    async save(data) {
        return await this.model.create(data)
    }

    async getById(id) {
        return await this.model.findOne({id})
    }

    async delete(id) {
        return await this.model.deleteOne({id})
    }

    async update(data, id) {
        const filter = { id };
        return await this.model.findOneAndUpdate(filter, data);
    }

}

module.exports = containerMongo



// const Producto = require('../models/product.js')
// const prod = new Producto(1, 'asd', 'titulo1', 'desc1', 500, 'thumb', 'code111', 50)

/*
const prodSaveModel = new mongoose.model.products(prod)
let prodSave = await prodSaveModel.save()
console.log(prodSave)

const config = require('./config.js')
config.startDB()

const Producto = require('./models/product.js')
const ProductoSchema = require('./daos/productsDaoMongo')

const prod = new Producto(1, 'asd', 'titulo1', 'desc1', 500, 'thumb', 'code111', 50)

async function guardar(){
    const prods = new ProductoSchema(prod)
    await prods.save()
    console.log(prods)
}

guardar()
*/