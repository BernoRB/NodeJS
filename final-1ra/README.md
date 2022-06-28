## Pruebas con endpoints
### 1. Inicio
* Nos posicionamos en la carpeta de inicio y ejecutamos node app.js para comenzar
* Salida esperada: "Servidor escuchando en el puerto 8080"

## PRODUCTOS

### 2. GET 'api/productos' sin productos
* Sin productos cargados, hacemos un GET a http://localhost:8080/api/productos/
* Salida esperada: Un json vacío porque no hay productos '[]'

### 3. POST 'api/productos' agregando productos sin permiso
* Agrego producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

// foto

### 3. POST 'api/productos' agregando productos con permiso
* Agrego producto teniendo la variable de ambiente 'admin' en true. Agrego este producto 3 veces.
* Salida esperada: devuelve el ID con el que se agregó. En la foto un '3'.

// foto

### 4. PUT 'api/productos' modificando productos sin permiso
* Modifico producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

// foto

### 5. PUT 'api/productos' modificando productos con permiso
* Modifico producto teniendo la variable de ambiente 'admin' en true.
* Salida esperada: "Producto actualizado correctamente"

// foto

### 6. DELETE 'api/productos' modificando productos con permiso
* Modifico producto teniendo la variable de ambiente 'admin' en true.
* Salida esperada: "Producto actualizado correctamente"

// foto

### 7. DELETE 'api/productos' borrando productos sin permiso
* Elimino producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

// foto

### 7. DELETE 'api/productos' borrando productos con permiso
* Elimino producto teniendo la variable de ambiente 'admin' en true.
* Salida esperada:   { "ok": "Producto eliminado correctamente" }

// foto

### 8. GET 'api/productos' con productos
* Traigo todos los productos habiendo cargado 3 antes y eliminado el n2 en el paso anterior.
* Salida esperada:

// foto

### 9. GET 'api/productos/:id?' correcto
* Traigo el producto con ID 3
* Salida esperada:

// foto

### 10. GET 'api/productos/:id?' incorrecto
* Intento traer el producto con ID 19
* Salida esperada: { "error": "Producto no encontrado" }

// foto

## CARRITO

### 11. POST 'api/carrito' crear un carrito
* Creamos un carrito
* Salida esperada: el ID del carrito creado

//foto

### 12. POST 'api/carrito/:id/productos' agregar producto al carrito
* Agregamos al carrito id '1' el producto con id '3' que le pasamos por body
* Salida esperada: { "ok": "Producto agregado al carrito" }

//foto

### 13. POST 'api/carrito/:id/productos' agregar producto que no existe
* Intentamos agregar al carrito id '1' el producto con id '333' que le pasamos por body
* Salida esperada: { "error": "Producto no encontrado" }

//foto

### 14. GET '/:id/productos' traer productos de carrito
* Nos traemos los productos que tenga el carrito id '1'
* Salida esperada: productos id 3 y 1, que agregue previamente

// foto

### 14. GET '/:id/productos' traer productos de carrito erroneo
* Nos traemos los productos que tenga el carrito id '15', que no existe
* Salida esperada: { "error": "Carrito no encontrado" }

// foto

### 15. DELETE '/:id/productos/:id_prod' eliminamos producto de carrito
* Eliminamos del carrito 1 el producto 3
* Salida esperada: 

// foto

### 16. DELETE '/:id/productos/:id_prod' eliminamos producto que no está
* Eliminamos del carrito 1 el producto 33 (no existe)
* Salida esperada: { "error": "No hay un producto con ese ID en tu carrito" }

// foto

### 17. DELETE '/:id/productos/:id_prod' eliminamos de carrito que no está
* Eliminamos del carrito 13 (no existe) el producto 3
* Salida esperada: { "error": "Carrito no encontrado" }

// foto

### 18. DELETE '/:id/' eliminamos un carrito
* Eliminamos el carrito 1
* Salida esperada: { "ok": "Carrito eliminado correctamente" }

// foto

### Extra
* Tanto los productos como los carritos persisten en memoria, se pueden encontrar los archivos en la carpeta 'data'. Tras hacer todas las pruebas de arriba, resulta en un archivo 'productos' con dos productos guardados y un archivo 'carrito' vacío porque terminamos eliminando el que creamos para las pruebas.