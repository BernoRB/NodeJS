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
        const prod = await this.model.findOne({id})
        if (prod)
            return prod
        throw new Error('No encontramos registro con ese ID')
    }

    async delete(id) {
        const exists = await this.getById(id)
        if (exists) {
            return await this.model.deleteOne({id})
        }
        throw new Error('No encontramos registro con ese ID')
    }

    async update(data, id) {
        const exists = await this.getById(id)
        if (exists) {
            const filter = { id };
            return await this.model.findOneAndUpdate(filter, data);
        }
        throw new Error('No encontramos registro con ese ID')
    }

    // Agrega datos a un campo especifico de un documento especifico
    async updatePush(data, id, field) {
        return await this.model.updateOne(
            { id : id },
            { $push: { [field] : data } }
        )
    }

    // Eliminamos por id un objeto dentro de un array de objetos de un documento (ej: producto de un carrito)
    async updatePull(idDocument, idObject, field) {
        return await this.model.updateOne(
            { id: idDocument },
            { $pull: { [field] : { id : parseInt(idObject) } } }
        )
    }
}

module.exports = containerMongo