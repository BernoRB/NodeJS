Desafio 13.

----------------------------------------------
Además del puerto, ahora se puede indicar por parámetro si iniciar en modo fork o cluster.
```
node server.js -p PORT -m fork
node server.js -p PORT -m cluster
```
Si no se le indica, por defecto el puerto es 8080 y el modo es fork

En la vista /info se agrega la cantidad de procesadores

![img](https://imgur.com/5sG7cAT.jpg)
![img](https://imgur.com/9pclEj7.jpg)

----------------------------------------------

Archivo configuración NGINX, vemos que redirige las consultas a /api/random a 8082, 8083, 8084 y 8085 (también se puede encontrar una copia en /src/utils/nginx.config)

```
events {
}

http {
    include       mime.types;
    default_type application/octet-stream;
    
    upstream desafio13 {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 80;
        server_name  localhost;
        
        location / {            
            root "C:\ruta_ejemplo_estatico";
            index  index.html index.htm;
        }

        location /api/randoms/ {
            proxy_pass http://desafio13;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }   
    }
}
```

----------------------------------------------

Comandos para crear clusters en los 4 puertos de la consigna
```
pm2 start ./server.js --name="c8082" --watch -i 3 -- -- -p 8082
pm2 start ./server.js --name="c8083" --watch -i 3 -- -- -p 8083
pm2 start ./server.js --name="c8084" --watch -i 3 -- -- -p 8084
pm2 start ./server.js --name="c8085" --watch -i 3 -- -- -p 8085
```

--name nombra el proceso
-i n crea cluster con n cpus
--watch ve y resetea cuando la app cambia
con -- suelto le indicamos que terminaron las opciones de pm2
con -p XXXX indicamos el puerto

![img](https://imgur.com/G0uZ24Y.jpg)
