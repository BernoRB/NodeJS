//Mongo
const { productsDaoMongo } = require('./productsDaoMongo')
const { cartsDaoMongo } = require('./cartsDaoMongo')

//Firebase
const { productsDaoFb } = require('./productsDaoFirebase')
const { cartsDaoFb } = require('./cartsDaoFirebase')

// Archivo
const { cartsDaoArchivo } = require('./cartsDaoArchivo')
const { productsDaoArchivo } = require('./productsDaoArchivo')

// Memoria
const { cartsDaoMemoria } = require('./cartsDaoMemoria')
const { productsDaoMemoria } = require('./productsDaoMemoria')

let productD
let cartD

if (process.env.ENGINE == 'MONGO'){
    console.log('PERSISTENCIA: MONGODB')
    productD = productsDaoMongo
    cartD = cartsDaoMongo
}

if (process.env.ENGINE == 'FIREBASE'){
    console.log('PERSISTENCIA: FIREBASE')
    productD = productsDaoFb
    cartD = cartsDaoFb
}

if (process.env.ENGINE == 'FILE'){
    console.log('PERSISTENCIA: ARCHIVO')
    productD = productsDaoArchivo
    cartD = cartsDaoArchivo
}

if (process.env.ENGINE == 'MEMORIA'){
    console.log('PERSISTENCIA: MEMORIA')
    productD = productsDaoMemoria
    cartD = cartsDaoMemoria
}

module.exports = { productD, cartD }