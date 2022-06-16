## Pruebas: orden sugerido
### 1. Inicio
* Nos posicionamos en la carpeta src y ejecutamos node index.js para comenzar
* Salida esperada: "Servidor escuchando en el puerto 8080"


### 2. GET 'api/productos' sin productos (traer todos los productos erróneo)
* Sin productos cargados, hacemos un GET a http://localhost:8080/api/productos/
* Salida esperada: { "error": "Aun no hay productos" }
```json
 { "error": "Aun no hay productos" }
 ```

### 3. Agregamos productos falsos
* Hacemos un GET a http://localhost:8080/api/productos/cargaFalsa lo que carga 3 produtos para facilitar las pruebas
* Salida esperada: "Productos de prueba cargados OK"

### 4. GET 'api/productos' con productos (traer todos los productos exitoso)
* Ya con productos, hacemos un GET a http://localhost:8080/api/productos/
* Salida esperada: 
```json
[{"id":1,"name":"Las Moras","price":600,"thumbnail":"www.imgimg.com"},{"id":2,"name":"Otro loco mas","price":500,"thumbnail":"www.imgimg.com"},{"id":3,"name":"Rutini","price":1100,"thumbnail":"www.imgimg.com"}]
```

### 5. GET 'api/productos/:id/ (traer producto por id, exitoso)
* Hacemos un GET a http://localhost:8080/api/productos/2 (producto que existe)
* Salida esperada:
```json
{"id":2,"name":"Otro loco mas","price":500,"thumbnail":"www.imgimg.com"}
```

### 6. GET 'api/productos/:id/ (traer producto por id, erróneo)
* Hacemos un GET a http://localhost:8080/api/productos/15 (producto que no existe)
* Salida esperada:
```json
{"error":"Producto no encontrado"}
```

### 7. POST 'api/productos/ (agregar producto por request, Postman o similares)
* Hacemos un POST a http://localhost:8080/api/productos/ con los datos del producto en el body:
```json
{ "name": "El Bautismo",    "price": 700,    "thumbnail": "http://rutaimagen.com/" }
```

* Salida esperada: (podemos luego llamar a GET api/productos para corroborar que se agregó)
```json
"Producto agregado correctamente con el id 4"
```

### 8. POST 'api/productos/ (agregar producto por Form)
* Ingresamos a http://localhost:8080/, completamos los datos en el formulario y le damos a ENVIAR
* Salida esperada POR ALERT: (podemos luego llamar a GET api/productos para corroborar que se agregó)
```json
"Producto agregado correctamente con el id 5"
```

### 9. PUT 'api/productos/:id' (modificar producto, exitoso)
* Hacemos un PUT a http://localhost:8080/api/productos/2, vamos a editar el precio, pasamos los datos en el body:
```json
{ "name": "Otro Loco Mas",    "price": 700,    "thumbnail": "www.imgimg.com/" }
```
* Salida esperada POR ALERT: (podemos luego llamar a GET api/productos/2 para corroborar el resultado)
```json
"Producto actualizado correctamente"
```

### 10. PUT 'api/productos/:id' (modificar producto, erróneo)
* Hacemos un PUT a http://localhost:8080/api/productos/15, vamos a intentar editar un producto inexistente
* Salida esperada:
```json
{"error":"Producto no encontrado"}
```

### 11. DELETE 'api/productos/:id' (eliminar producto, exitoso)
* Hacemos un DELETE a http://localhost:8080/api/productos/2
* Salida esperada:
```json
"Producto eliminado correctamente"
```

### 12. DELETE 'api/productos/:id' (eliminar producto, erróneo)
* Hacemos un DELETE a http://localhost:8080/api/productos/19
* Salida esperada:
```json
{"error":"Producto no encontrado"}
```






