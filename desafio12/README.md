Desafio 11, autenticación.
* Tomamos como base el desafio 10.
* Se agregan las vistas de 'signup' y 'login'.
* Cada una de estas nuevas vistas tiene un botón que redirije a la otra.
* No se puede ir al 'dashboard' sin la sesión correctamente iniciada.
* Si se intenta ir a alguna de ellas con la sesión correctamente iniciada, lo lleva al 'dashboard'.
* Si hay error al registrar (usuario ya registrado) o si ingresa incorrectamente usuario/contraseña, se lo informa.
* La contraseña se guarda encriptada con bcrypt.
* Desde el dashboard se permite cerrar sesión con un botón dispuesto a tal fin.
* Al hacer logout, lo despide y lo devuelve a la vista de login.

----------------------------------------------
### Pantalla de Login

![img](https://imgur.com/H629NnO.jpg)

----------------------------------------------

### Usuario registrado, guardado en DB, con contraseña encriptada.

![img](https://imgur.com/bZeoSxC.jpg)

----------------------------------------------

### Dashboard

![img](https://imgur.com/tPN6z81.jpg)
----------------------------------------------

### Tras apretar 'logout'

![img](https://imgur.com/QHeGVyg.jpg)

----------------------------------------------

### Al ingresar erróneamente usuario o contraseña

![img](https://imgur.com/C0oJqhO.jpg)

----------------------------------------------

### Session en DB

![img](https://imgur.com/SVp8aSV.jpg)