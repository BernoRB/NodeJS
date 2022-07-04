const knex = require('knex')

class dbController {
    constructor(options, tableName) {
        this.knex = knex(options)
        this.table = tableName
    }

    async createTable() {
        // La creamos si no existe
        const exists = await this.knex.schema.hasTable(this.table)
        if (!exists) {
            if (this.table == 'messages') {
                await this.knex.schema.createTable(this.table, (table) => {
                    table.increments('id').primary()
                    table.string('msgEmail', 50).notNullable()
                    table.string('msgDate', 50).notNullable()
                    table.string('msgContent', 200).notNullable()
                    console.log('Tabla creada mensajes')
                })
            }
            else if (this.table == 'products') {
                await this.knex.schema.createTable(this.table, (table) => {
                    table.increments('id').primary()
                    table.string('name', 50).notNullable()
                    table.float('price').notNullable()
                    table.string('thumb', 200)
                    console.log('Tabla creada productos')
                })
            }
            else { console.log('No se permite crear una tabla con ese nombre ') } //nunca deberia entrar aca porque no lo llamo nunca con otro nombre
        }
    }




    insert(toInsert) {
        this.knex(this.table).insert(toInsert)
            .then(() => console.log('Data insertada correctamente'))
            .catch((err) => { console.log(err); throw err })
    }



    selectAll() {
        const dataArr = []

        return this.knex(this.table).select('*')
            .then((result) => {
                result.forEach((value) => {
                    dataArr.push(value)
                })
                return dataArr
            })


    }

}

module.exports = dbController