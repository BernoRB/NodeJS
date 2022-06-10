const fs = require('fs')

class Product {
    constructor(title, price) {
        this.title = title,
        this.price = price
    }
}

class Contenedor {
    constructor(route) {
        this.route = route
        try {
            // Leo el archivo, guardo los productos en atributo products
            this.products = fs.readFileSync(this.route, 'utf-8')
            this.products = JSON.parse(this.products)
            console.log('Productos cargados exitosamente')
        }
        catch (err) {
            this.products = []
            console.log('No hay productos, ¡agregá nuevos!')
        }
    }

    // Recibe un producto, lo guarda en el archivo, devuelve el ID asignado
    async save(title, price) {
        // Primero me encargo de encontrar el ID que llevará
        let newId = 1
        if (!this.products.length == 0) {
            this.products.map(prod => {
                if (prod.id > newId)
                    newId = prod.id
            })
            newId++
        }

        // Creo el producto, asigno atributos
        let newProd = new Product(title, price)
        newProd.id = newId

        // Lo guardo al array, guardo el array en el archivo
        this.products.push(newProd)
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(this.products, null, '\t'))
            console.log(`Producto guardado con el id ${newId}`)
        }
        catch (err) {
            console.log('Hubo un error al intentar guardar el producto', err)
        }
    }

    // Recibe un id, devuelve el objeto con ese id o null si no existe
    getById(idNumber) {
        try {
            let productoPorId = this.products.find((element) => element.id == idNumber)
            return productoPorId || null
        }
        catch {
            console.log('Hubo un error al intentar obtener el producto')
        }
    }

    // Devuelve un array con los objetos del archivo
    getAll() {
        if (!this.products.length == 0)
            return this.products
        else
            return ('No hay productos...')
    }

    // Recibe un id, elimina ese producto
    async deleteById(idNumber) {
        try {
            const indexProd = this.products.findIndex((element) => element.id == idNumber)
            if (indexProd != -1) {
                this.products.splice(indexProd, 1)
                await fs.promises.writeFile(this.route, JSON.stringify(this.products, null, '\t'))
                console.log('Producto eliminado correctamente')
            } else 
                console.log('Ese producto no existe')
        } catch (error) {
            console.log('Error al intentar eliminar el producto');
        }
    }

    // Elimina todos los archivos
    async deleteAll() {
        try {
            if(this.products.length != 0) {
                await fs.promises.writeFile(this.route, '')
                console.log('Contenido eliminado')
            } else 
                console.log('No hay nada que borrar')
        }
        catch (err) {
            console.log('Hubo un error al intentar eliminar los productos', err)
        }
    }
    
}

module.exports = Contenedor