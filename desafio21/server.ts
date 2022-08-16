//@ts-ignore //linea para que no tire error al importar .ts sin instalar extension
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

router.get('/colors', (ctx) => {
    const respuesta = getAll()
    ctx.response.body = respuesta
})

router.get('/colors/:colorInput', (ctx) => {
    const color = ctx.params.colorInput
    add(color)
    ctx.response.body = `Se agregó el color: ${color}`;
})

function getAll() {
    const colours: string[] = []
    if (localStorage.getItem('colors'))
        return JSON.parse(localStorage.getItem('colors') || '');
    return colours
}

function add(color) {
    const colors = getAll()
    colors.push(color)
    localStorage.setItem('colors', JSON.stringify(colors))
}


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())
await app.listen({ hostname: "127.0.0.1", port: 8080 })

localStorage.clear()