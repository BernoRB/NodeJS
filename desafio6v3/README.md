## Pruebas
### 1. Inicio
* Nos paramos en la carpeta del proyecto, npm init y luego iniciamos con npm start
* Salida esperada: "Escuchando en el puerto 8080"

### 2a. Situaciones iniciales: Formulario
* Corroboramos que aparece el formulario: entramos a http://localhost:8080/
* Salida esperada: se visualiza el formulario para cargar un producto en el navegador

![Imgur](https://imgur.com/kt8m0j4.jpg)

### 2b. Situaciones iniciales: Lista de productos
* Sección "Todos los productos"
* Se espera: 'No hay productos! Agregá algunos con el formulario de arriba o pegándole a /cargaFalsa'

![Imgur](https://imgur.com/sKBptFK)
### 2c. Situaciones iniciales: Chat
* Sección "Chat"
* Se espera: se visualiza un formulario para ingresar mail y mensaje

![Imgur](https://imgur.com/kjKnI1o)

### 3-a. Carga productos por mockeo, vista de productos
* Llamamos a http://localhost:8080/productos/cargaFalsa (facilitado para agregar productos con thumbnails más fácil)
* Salida esperada: ahora en "Lista de productos" aparecen tres productos

![Imgur](https://imgur.com/rIUGvoc)

### 3-b. Carga productos por form, vista de productos
* Ingresamos titulo, precio y thumbnail (este último opcional) y le damos 'Enviar'
* Salida esperada: el producto se agregó a nuestra lista 'Todos los productos'

![Imgur](https://imgur.com/Vlx8XIr)

### 4. Chat
* Bajamos al chat, completamos los campos y enviamos mensajes
* Salida esperada: el mensaje se agrega en pantalla junto al mail del usuario y la fecha
* Extra: el chat persiste por archivo, por lo que podemos bajar el servidor, volver a subirlo y los mensajes seguirán ahí

![Imgur](https://imgur.com/XpZTDHC)

### 5. Paralelo a todo
* Podemos abrir varias sesiones para corroborar que lo que se agrega en una (producto o mensaje) aparece en las demás.