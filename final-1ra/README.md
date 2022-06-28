## Pruebas con endpoints
### 1. Inicio
* Nos posicionamos en la carpeta de inicio y ejecutamos node app.js para comenzar
* Salida esperada: "Servidor escuchando en el puerto 8080"

## PRODUCTOS

### 2. GET 'api/productos' sin productos
* Sin productos cargados, hacemos un GET a http://localhost:8080/api/productos/
* Salida esperada: Un json vacío porque no hay productos '[]'

![Imgur](https://imgur.com/vZLnk9x.jpg)

### 3. POST 'api/productos' agregando productos sin permiso
* Agrego producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

![Imgur](https://imgur.com/D0fL09D.jpg)

### 3. POST 'api/productos' agregando productos con permiso
* Agrego producto teniendo la variable de ambiente 'admin' en true. Agrego este producto 3 veces.
* Salida esperada: devuelve el ID con el que se agregó. En la foto un '3'.

![Imgur](https://imgur.com/6TIpqyG.jpg)

### 4. PUT 'api/productos' modificando productos sin permiso
* Modifico producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

![Imgur](https://imgur.com/QxWA5aI.jpg)

### 5. PUT 'api/productos' modificando productos con permiso
* Modifico producto teniendo la variable de ambiente 'admin' en true.
* Salida esperada: "Producto actualizado correctamente"

![Imgur](https://imgur.com/tf1ulo9.jpg)

### 6. DELETE 'api/productos' modificando productos con permiso
* Modifico producto teniendo la variable de ambiente 'admin' en true.
* Salida esperada: "Producto actualizado correctamente"

![Imgur](https://imgur.com/wFB9yqM.jpg)

### 7. DELETE 'api/productos' borrando productos sin permiso
* Elimino producto teniendo la variable de ambiente 'admin' en false.
* Salida esperada: error

![Imgur](https://imgur.com/uvk2jYv.jpg)

### 8. GET 'api/productos' con productos
* Traigo todos los productos habiendo cargado 3 antes y eliminado el n2 en el paso anterior.
* Salida esperada:

![Imgur](https://imgur.com/vSadECU.jpg)

### 9. GET 'api/productos/:id?' correcto
* Traigo el producto con ID 3
* Salida esperada:

![Imgur](https://imgur.com/g6qpwew.jpg)

### 10. GET 'api/productos/:id?' incorrecto
* Intento traer el producto con ID 19
* Salida esperada: { "error": "Producto no encontrado" }

![Imgur](https://imgur.com/xDdpQyJ.jpg)

## CARRITO

### 11. POST 'api/carrito' crear un carrito
* Creamos un carrito
* Salida esperada: el ID del carrito creado

![Imgur](https://imgur.com/NGIftWV.jpg)

### 12. POST 'api/carrito/:id/productos' agregar producto al carrito
* Agregamos al carrito id '1' el producto con id '3' que le pasamos por body
* Salida esperada: { "ok": "Producto agregado al carrito" }

![Imgur](https://imgur.com/HfyYVB6.jpg)

### 13. POST 'api/carrito/:id/productos' agregar producto que no existe
* Intentamos agregar al carrito id '1' el producto con id '333' que le pasamos por body
* Salida esperada: error

![Imgur](https://imgur.com/gSzgay9.jpg)

### 14. GET '/:id/productos' traer productos de carrito
* Nos traemos los productos que tenga el carrito id '1'
* Salida esperada: productos id 3 y 1, que agregue previamente

![Imgur](https://imgur.com/U3jq7mA.jpg)

### 15. GET '/:id/productos' traer productos de carrito erroneo
* Nos traemos los productos que tenga el carrito id '15', que no existe
* Salida esperada: { "error": "Carrito no encontrado" }

![Imgur](https://imgur.com/Q6jcNHG.jpg)

### 16. DELETE '/:id/productos/:id_prod' eliminamos producto de carrito
* Eliminamos del carrito 1 el producto 3
* Salida esperada: 

![Imgur](https://imgur.com/1F7WgGr.jpg)

### 17. DELETE '/:id/productos/:id_prod' eliminamos producto que no está
* Eliminamos del carrito 1 el producto 33 (no existe)
* Salida esperada: { "error": "No hay un producto con ese ID en tu carrito" }

![Imgur](https://imgur.com/sJTyxY8.jpg)

### 18. DELETE '/:id/productos/:id_prod' eliminamos de carrito que no está
* Eliminamos del carrito 13 (no existe) el producto 3
* Salida esperada: { "error": "Carrito no encontrado" }

![Imgur](https://imgur.com/osbJNN4.jpg)

### 19. DELETE '/:id/' eliminamos un carrito
* Eliminamos el carrito 1
* Salida esperada: { "ok": "Carrito eliminado correctamente" }
* Olvidé sacar foto

### Extra
* Tanto los productos como los carritos persisten en memoria, se pueden encontrar los archivos en la carpeta 'data'. Tras hacer todas las pruebas de arriba, resulta en un archivo 'productos' con dos productos guardados y un archivo 'carrito' vacío porque terminamos eliminando el que creamos para las pruebas.
