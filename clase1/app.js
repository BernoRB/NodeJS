class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({ 
            nombre: nombreLibro, 
            autor: autorLibro 
        })
    }

    getBookNames() {
        return this.libros.map((libro) => libro.nombre)
    }
}

// Creo usuario con algunos datos
const u1 = new Usuario('Bernabe', 'Rodriguez', [{ nombre: 'LibroUno', autor: 'AutorUno' }], ['Perro'])

// Añado mascotas
u1.addMascota('Gato')
u1.addMascota('Canario')

// Añado libros
u1.addBook('LibroDos', 'AutorDos')
u1.addBook('LibroTres', 'AutorTres')

// Llamamos a los métodos que nos devuelven algo y lo mostramos en consola
console.log(u1.getFullName())
console.log(u1.countMascotas())
console.log(u1.getBookNames())