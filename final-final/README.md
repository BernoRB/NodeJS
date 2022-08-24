## Desafio final
### Node, Express, MongoDB, Mongoose, Passport, Bcrypt, Sockets, Handlebars, Nodemailer, Twilio, Log4j, Multer.
----------------------------------------------

Al entrar a la página ('/') sin estar logeado, se llega al menú de login:

![img](https://imgur.com/MqSHQY5.jpg)

Si se ingresa una contraseña o usuario incorrecto, se le avisa:

![img](https://imgur.com/ch4rI9P.jpg)

El usuario se autentica con Passport Local y los datos están almacenados en una base de datos en Mongo Atlas.

Si el usuario no tiene cuenta puede presionar en "Registrarse" y, sin salir de esa página, se muestra la siguiente página (en la foto los datos ya fueron completados):

![img](https://imgur.com/cD0mqgv.jpg)

La contraseña se almacena encriptada y la imagen se guarda en el servidor en la carpeta public, guardándose en la base de datos el filename.

![img](https://imgur.com/2n4ptVI.jpg)

![img](https://imgur.com/hRxKPLT.jpg)

Al crearse un nuevo usuario el administrador recibe un email con los datos

![img](https://imgur.com/V0q96va.jpg)

Al ingresar al dashboard, ya sea por login exitoso o por haberse registrado correctamente, el usuario se encuentra la vista de la siguiente imagen, que contiene los productos y un navbar que muestra: el avatar que cargó, su username, su mail, y links a productos, mi cuenta, carrito, agregar producto y logout.

El menú sólo muestra "Agregar Prod" y "Server Info" si el usuario es administrador (manejado por una variable global)

![img](https://imgur.com/kZwtKNE.jpg)

Los productos pueden filtrarse por categoria haciendo click en los botones

![img](https://imgur.com/sLCjf6N.jpg)

Traemos un producto por ID

![img](https://imgur.com/wtl5ZIM.jpg)

Si vamos a "Mi cuenta" nos encontramos con la información que el usuario ingresó a la hora de registrarse:

![img](https://imgur.com/f4jQxlq.jpg)

En "productos" podemos presionar "Anadir al carro" para, bueno, añadir productos al carrito. Una vez hecho, en la vista "Carrito" nos encontramos con lo siguiente.

Podemos ver que si se agregan dos del mismo, la cantidad indica 2.

![img](https://imgur.com/t6ehAqe.jpg)

Y en la base de datos:

![img](https://imgur.com/bA9h6rm.jpg)

Si apretamos la "X" de la derecha quitamos el producto del carrito:

![img](https://imgur.com/ERahhSK.jpg)

Si presionamos "Seguir comprando" te devuelve a la vista de productos. Si apretamos "Confirmar compra" pasa que:

1. El carrito está asociado al email del usuario y se crea en la vista "productos". Al presionar confirmar compra el carrito se elimina y, al redirigirte inmediatamente a la vista productos, se crea otro (vacio, claro, como vemos en la imagen al volver a "carrito").
2. Se crea una orden con los datos necesarios.
3. Se envia un mail al administrador con los datos de la orden.
4. Se envia un mensaje de texto al cliente indicando la compra.

![img](https://imgur.com/L3Zlvmf.jpg)

![img](https://imgur.com/V0yhbbE.jpg)

![img](https://imgur.com/fopnZ5c.jpg)

Orden en DB:

![img](https://imgur.com/8azTBVL.jpg)

En cuanto a lo de eliminar carrito, en la web se elimina, al confirmar la orden, llamando a un middleware en la ruta POST "carrito/confirmation" que dispara la eliminación del carrito, la creacion de la orden y el envío de los mails y sms. Como la consigna pide un Delete a la ruta /carrito/:id, la cree y también es funcional a través de Postman:

![img](https://imgur.com/3W6Weay.jpg)

La siguiente es la vista de Agregar producto, accesible y visible en el menú solo para admins. La imagen del producto, al igual que el avatar, se guarda en el servidor.

![img](https://imgur.com/3wcn5wA.jpg)

Lo siguiente nos lo encontramos en 'Info Server', disponible solo para admin

![img](https://imgur.com/Faj1jLY.jpg)

Pasando al Chat, si ingresamos como un usuario COMUN (no modo admin) nos encontramos lo siguiente, una vista donde escribir mensajes y donde se ven los mensajes de todos, general:

![img](https://imgur.com/CCO8MjZ.jpg)

Luego de ingresar mensajes desde dos cuentas diferentes:

![img](https://imgur.com/jqHE5ky.jpg)

Guardados en la DB:

![img](https://imgur.com/CeOoYyo.jpg)

Ingresamos ahora en modo ADMIN. Vemos que ahora en /chat podemos RESPONDER los mensajes.

![img](https://imgur.com/iALpRbB.jpg)

Tras responder a ambos:

![img](https://imgur.com/p7qx76f.jpg)

Volvemos ahora a los usuarios sin modo admin, y al clickear en 'Ir a chat privado' nos lleva a un chat 'modo privado' donde al clickear 'Mostrar Mensajes' solo se ven las preguntas propias y las respuestas del administrador:

![img](https://imgur.com/F6u7Kil.jpg)

![img](https://imgur.com/Nu2LwH5.jpg)

Siguiendo con las consignas, el proyecto no tiene ningún console log sino que usa logger. Los warn y los error se guardan en archivos.

![img](https://imgur.com/YZtEqMV.jpg)

![img](https://imgur.com/JxZgj5O.jpg)

![img](https://imgur.com/UxVo8Nz.jpg)

![img](https://imgur.com/VBPCLl8.jpg)

Tambien puede inicializarse en modo cluster con una variable env "MODE".
