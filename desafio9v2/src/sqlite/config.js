const db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './src/sqlite/mydb.sqlite',
    },
    useNullAsDefault: true
})

module.exports = db