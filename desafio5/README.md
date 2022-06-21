## Pruebas: orden sugerido
### 1. Inicio
* Para cada uno de las tres partes del proyecto nos situamos en su respectiva carpeta, ejecutamos node main.js y hacemos los pasos 2, 3, 4, 5 y 6.
* Salida esperada: "Servidor escuchando en el puerto 8080"

### 2. Formulario
* Corroboramos que aparece el formulario: entramos a http://localhost:8080/
* Salida esperada: se visualiza el formulario para cargar un producto en el navegador

### 3. Lista de productos, sin productos
* Sin cargar ningún producto, clickeamos "Ver Productos"
* Salida esperada: Mensaje de 'No hay productos' y un botón para agregar producto

### 4. Botón agregar producto
* Clickeamos el botón de Agregar producto
* Salida esperada: nos retorna al formulario de carga de producto

### 5. Agregamos productos de prueba y por formulario
* Llamamos a http://localhost:8080/productos/cargaFalsa (facilitado para agregar productos con thumbnails más fácil), nos retornará al formulario y ahí procedemos a cargar la cantidad que querramos de productos a través del form
* Salida esperada: cada producto agregado (o tras la carga falsa) nos retornará nuevamente al formulario

### 6. Lista de productos, con productos
* Clickeamos "Ver productos"
* Salida esperada: se mostrará una tabla con los productos cargados
