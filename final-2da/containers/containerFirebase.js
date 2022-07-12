const admin = require('firebase-admin')
const firebase = require('firebase-admin')
const { FIREBASE_CONFIG } = require('../config')

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG)
})

const db = admin.firestore()

class containerFirebase {
    constructor(collection) {
        this.collection = db.collection(collection)
        console.log(`Base conectada con la collection ${collection}`)
    }

    async save(document, id) {
        const doc = this.collection.doc(`${id}`)
        return await doc.create(document)
    }

    async getAll() {
        const result = await this.collection.get()
        return result.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
    }

    async getById(id) {
        let result = await this.collection.get()
        result = result.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
        return await result.find(elem => elem.id == id)
    }

    async delete(id) {
        const doc = this.collection.doc(`${id}`)
        doc.delete()
        return ({ status: 'Entrada eliminada' })
    }

    async update(content, id) {
        const doc = this.collection.doc(`${id}`)
        return await doc.update(content)
    }

    async updatePush(data, id, field) {
        const doc = this.collection.doc(`${id}`)
        return await doc.update({
            [field]: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }

    async updatePull(id, data, field) {
        const doc = this.collection.doc(`${id}`)
        return await doc.update({
            [field]: firebase.firestore.FieldValue.arrayRemove(data)
        })
    }

}

module.exports = containerFirebase
