# Proyecto Final Back-End CH
## Segunda Entrega

### Instrucciones
* Clonamos, instalamos dependencias y ejecutamos
* En [ESTE LINK](https://github.com/BernoRB/NodeJS/blob/main/final-2da/thunder-collection_Back%20-%20Desafio%20Final.json) está una colección de Thunder para poder probar todos los endpoints
* En esta segunda entrega el tipo de persistencia de los datos se define desde la variable de entorno .env 'ENGINE' (pudiendo adoptar los valores MONGO, FIREBASE, ARCHIVO y MEMORIA)
* El acceso o no a los endpoint que requieren ADMIN se configuran desde la variable de entorno .env 'ADMIN' (pudiendo adoptar los valores TRUE o FALSE)

### Endpoints

* Productos

| HTTP | Endpoint | Accion |
| ------ | ------ | ------ |
| GET  | http://localhost:8080/api/productos  | Lista productos |
| GET  | http://localhost:8080/api/productos/:id  | Trae un producto |
| POST  | http://localhost:8080/api/productos/  | Agrega producto |
| DELETE  | http://localhost:8080/api/productos/:id  | Elimina producto |
| PUT  | http://localhost:8080/api/productos/:id  | Modifica producto |

* Carritos

| HTTP | Endpoint | Accion |
| ------ | ------ | ------ |
| POST  | http://localhost:8080/api/carrito  | Crea carrito |
| DELETE  | http://localhost:8080/api/carrito/:id  | Elimino un carrito |
| POST  | http://localhost:8080/api/carrito/:id/productos  | Agrego un producto al carrito |
| GET  | http://localhost:8080/api/carrito/:id/productos  | Muestro los productos del carrito |
| DELETE  | http://localhost:8080/api/carrito  | Elimino un producto del carrito |
