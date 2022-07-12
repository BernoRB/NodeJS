//Mongo
const { productsDaoMongo } = require('./productsDaoMongo')
const { cartsDaoMongo } = require('./cartsDaoMongo')

//Firebase
const { productsDaoFb } = require('./productsDaoFirebase')
const { cartsDaoFb } = require('./cartsDaoFirebase')

// Archivo
const { cartsDaoArchivo } = require('./cartsDaoArchivo')
const { productsDaoArchivo } = require('./productsDaoArchivo')

let productD
let cartD

if (process.env.ENGINE == 'MONGO'){
    console.log('PERSISTENCIA: MONGODB')
    productD = productsDaoMongo
    cartD = cartsDaoMongo
}

if (process.env.ENGINE == 'FILE'){
    console.log('PERSISTENCIA: ARCHIVO')
    productD = productsDaoArchivo
    cartD = cartsDaoArchivo
}

if (process.env.ENGINE == 'FIREBASE'){
    console.log('PERSISTENCIA: FIREBASE')
    productD = productsDaoFb
    cartD = cartsDaoFb
}

module.exports = { productD, cartD }