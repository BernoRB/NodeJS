const { Carts } = require('../models/Carts.js')
const { Products } = require('../models/Product')
//const { loggerWarn } = require('../utils/logger.js')


const createCart = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    const hasCart = await findCartByEmail(req)
    if (!hasCart) {
        const cart = {
            email: req.user.email,
            date: new Date().toLocaleString(),
            address: req.user.address
        }
        await Carts.create(cart)
    }
    next()
}

// Busca un carrito en función del email del usuario
// Lo pense asi dado que no se puede comprar como invitado y que no tiene sentido que un usuario tenga más de un carrito, por lo que 1 email = 1 carrito, siempre
async function findCartByEmail(req) {
    const hasCart = await Carts.findOne({ email: req.user.email }, '_id').exec() //el exec le indica que otherwise, null
    return hasCart
}

const addToCart = async (req, res) => {
    const idCart = req.params.id
    const idProd = req.body.productId
    const prodToAdd = await Products.findById(idProd)

    let cart = await Carts.findOne({ id: idCart }) // nos traemos el carrito
    const itemIndex = cart.products.findIndex(p => p._id == idProd) // buscamos si el producto ya esta en el carrito

    if (itemIndex > -1) {
        //ya esta en el carrito, actualizamos cantidad
        const prodInCart = cart.products[itemIndex]
        prodInCart.quantityInCart = prodInCart.quantityInCart + 1
        cart.products[itemIndex] = prodInCart
    } else {
        //no esta en el carrito, lo agregamos
        await Carts.updateOne(
            { id: idCart },
            { $push: { products: prodToAdd } }
        )
    }
    cart = await cart.save()
    res.redirect('/productos')
}


const getCart = async (req, res) => {
    const isAdmin = process.env.ADMIN == 'YES'
    const idCart = req.params.id
    let cart = await Carts.findOne({ id: idCart })
    let totalOrder = 0
    cart.products.forEach(p => totalOrder += (p.quantityInCart * p.price))

    //Productos a string y con espacios reemplazados por %20 para poder pasarlos por post y mandar el mail/sms
    let productsString = JSON.stringify(cart.products).replace(/ /g, '%20')

    res.render('cart', {
        username: req.user.username,
        email: req.user.email,
        avatar: `images/${req.user.avatar}`,
        products: cart.products,
        loggedIn: true,
        cartId: idCart,
        totalOrder: totalOrder,
        productsString: productsString,
        isAdmin: isAdmin
    })
    
}


const deleteFromCart = async (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.id_prod
    // nos traemos el carrito y el index del producto a borrar del mismo
    let cart = await Carts.findOne({ id: idCart })
    const itemIndex = cart.products.findIndex(p => p._id == idProd)
    // nos quedamos los productos, eliminamos el deseado y hacemos update al carrito con el nuevo productos
    let productos = cart.products
    productos.splice(itemIndex, 1)
    await Carts.updateOne({ _id: idCart }, { $set: { 'products' : productos } })

    res.redirect(`/carrito/${idCart}/productos`)
}


// Dos destroyCart
// Uno como middleware para cuando le pego por la web tras confirmar la orden
// El otro para pegarle por postman y cumplir la consigna de que exista esa ruta delete
const destroyCartMw = async (req, res, next) => {
    await Carts.deleteOne({ id : req.body.cartId })
    next()
}

const destroyCart = async (req, res) => {
    await Carts.deleteOne({ id : req.params.id })
    res.json('Eliminado')
}



module.exports = { createCart, addToCart, getCart, deleteFromCart, destroyCart, destroyCartMw }