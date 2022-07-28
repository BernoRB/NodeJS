Desafio 14

----------------------------------------------
Con base en el 13

* Puede recibir el comando -g true para aplicar gzip compression en la ruta info

Vemos el tamaño mas pequeno con gzip que sin gzip:

![img](https://imgur.com/ph26q4i.jpg)
![img](https://imgur.com/YzSWCHD.jpg)

* Agregamos logs con Log4js:

Archivo warn.log: rutas inexistentes a las que se intento acceder

![img](https://imgur.com/ORTxaPX.jpg)

Archivo error.log: en este caso mostramos un error lanzado por el login (rompi el codigo para lanzar un error)

![img](https://imgur.com/xdwZaYe.jpg)

Consola: error + warn + info (rutas y metodos)

![img](https://imgur.com/Z57Qe6H.jpg)
![img](https://imgur.com/6lOh382.jpg)

* Test artillery:

Con el siguiente comando testeamos la carga con artillery, emulando 50 conexiones con 20 req cada una y guardando la salida en result_fork.txt

```
artillery quick --count 50 -n 20 http://localhost:8080/info > result_fork.txt
```