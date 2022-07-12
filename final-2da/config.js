// Archivo de configuracion para conexion con base de datos
require('dotenv').config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI || '',
    FIREBASE_CONFIG : JSON.parse(process.env.FIREBASE_CONFIG) || ''
}