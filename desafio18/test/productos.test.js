const request = require("supertest")
const { describe, it } = require("mocha")
const { expect } = require("chai")
const { app } = require('../server')
let cantProds = 0

describe("Acciones para productos", () => {

    it("Deberia traer los productos", async () => {
        const response = await request(app).get("/productos")
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
        
        cantProds = response.body.length
    })

    it("Deberia agregar un producto", async () => {
        const prod = {
            id: 4,
            title: "Agregado Test",
            category: "Malbec",
            price: 4567,
        }
        const response = await request(app)
            .post("/productos")
            .send(prod)
            .set("Content-Type", "application/json")
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal(`Agregado producto`)
        expect(response.body.product).to.be.an('object')
        expect(response.body.product.title).to.equal(prod.title)
    })

    it("Deberia editar un producto", async () => {
        const ediProd = {
            id: 3,
            title: "Editado Test",
            category: "Malbec",
            price: 4567,
        }
        const response = await request(app)
            .put(`/productos/${ediProd.id}`)
            .send(ediProd)
            .set("Content-Type", "application/json")
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal(`Editado producto`)
        expect(response.body.product).to.be.an('object')
        expect(response.body.product.title).to.equal(ediProd.title)
    })


    it("Deberia eliminar un producto", async () => {
        const response = await request(app)
            .delete(`/productos/1`)
            .set("Content-Type", "application/json")
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal(`Eliminado producto`)
        expect(response.body.products.length).to.equal(cantProds)


        //expect(response.body.lengthPreDelete).to.be.an('object')
        //expect(response.body.lengthPostDelete).toBeLessThan(response.body.lengthPreDelete);
    })

})