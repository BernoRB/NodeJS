##  Desafio 17

### 
-----------------

#### Iniciamos

En el .env se elije la persistencia, 'MONGO' (Mongo DB) o 'JSON' (archivo json en carpeta datafiles)

* Mongo: node server MONGO
* Json: node server JSON (imagen: por primera vez que crea el archivo + después cuando ya está creado)

![img](https://imgur.com/iEG0LPD.jpg)

#### POST /productos

* Le pasamos productos por Thunder:

´´´
{
    "title": "Otro Loco Mas",
    "category": "Malbec",
    "price": 700
}
´´´

![img](https://imgur.com/6VLuXyy.jpg)


#### GET /productos

* Hacemos un GET por Thunder/navegador:

![img](https://imgur.com/JRsoG8l.jpg)


#### Productos en DB/archivo:

![img](https://imgur.com/Hszl5wL.jpg)

![img](https://imgur.com/mXNC89S.jpg)