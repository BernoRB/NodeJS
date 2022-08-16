const productMongo = require("./productMongo")
const productJson = require("./productJson")
const persistence = process.env.PERSISTENCE || process.argv.slice(2) 

class PersistenceFactory {
    static async getPersistence() {
        try {
            if (persistence == 'MONGO')
                return new productMongo()
            else if (persistence == 'JSON')
                return new productJson()
            else
                throw new Error('No se pudo determinar el tipo de persistencia. Recuerde pasarlo por linea de comandos o configurarlo como variable de entorno.')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PersistenceFactory