const Contenedor = require('./app.js')

/* 
    -------------------------------------------
    -------------------------------------------
    -------------------------------------------
    ----------------- PRUEBAS -----------------
    -------IR DESCOMENTANDO PARA PROBAR--------
    -------------------------------------------
    -------------------------------------------
    -------------------------------------------
*/

// 1) Cargamos los productos
let file = new Contenedor('./products.txt') 

// 2) Guardamos un producto nuevo
// file.save('Nampe Malbec', 800)

// 3) Traemos un producto exitosamente y lo mostramos
// let prod = file.getById(2)
// console.log(prod)

// 4) Traemos un producto que no existe (devuelve 'null' por consigna)
// let prodFail = file.getById(400)
// console.log(prodFail)

// 5) Traemos todos los productos
// let allProds = file.getAll()
// console.log(allProds)

// 6) liminamos exitosamente un prodcuto
// file.deleteById(3)

// 7) Intentamos eliminar un producto que no existe
// file.deleteById(33)

// 8) Eliminamos todo exitosamente
// file.deleteAll()

// 9) Intentamos traer todos los productos sin que haya productos (ejecutar luego de eliminar todo)
// let allProds = file.getAll()
// console.log(allProds)

// 10) Intentamos eliminar todo sin que haya nada (ejecutar luego de eliminar todo)
// file.deleteAll()