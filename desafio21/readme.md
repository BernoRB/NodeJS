##  Desafio 21

Pequeño servidor con Deno que guarda un string de colores en localstorage.

Lo levantamos con

```
deno run --allow-net server.ts
```

Podemos traer los colores ingresados en la ruta:

```
http://127.0.0.1:8080/colors
```

Podemos agregar colores en la ruta:

```
http://127.0.0.1:8080/colors/:colorInput
```