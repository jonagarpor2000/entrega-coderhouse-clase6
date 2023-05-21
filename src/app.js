import {ProductManager} from './ProductManager.js'
import express from 'express'


const prodmg = new ProductManager('./products.json')

const productos = await prodmg.getProducts()

const app = express()

//implementación de la ruta RAIZ (http://localhost:8080/)
app.get('/', (request, response) => {
    response.send('<h1>Hola Mundo!!!</h1>')
})


app.get('/products/:pid', (request, response) => {
    const id = request.params.pid
    const prod_id = productos.find(item => item.id == id)
    if (!prod_id) return response.send({ error: 'El producto no existe' })
    response.send(prod_id)
})


app.get('/products', (request, response) => {
    const limit = request.query.limit
    if (!limit) {
        response.send(productos) //data onwire!
    } else {
        let prod_limit = productos.splice(0,limit)
        response.send(prod_limit) 
    }
})



app.listen(8080, () => console.log('Server Up'))