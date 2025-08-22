import express from 'express';
import { PORT } from './config.js';
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import caregoriaRoutes from './routes/categoria.routes.js'
import marcaRoutes from './routes/marca.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'
import productoRoutes from './routes/producto.routes.js'
import tipoProductoRoutes from './routes/tipoProducto.routes.js'
import imagenRoutes from './routes/imagen.routes.js'
import productoCategoriaRoutes from './routes/productoCategoria.routes.js'
import productoMarcaRoutes from './routes/productoMarca.routes.js' 

import tipoFormaDePagoRoutes from './routes/tipoFormaDePago.routes.js'        
import formaDePagoRoutes from './routes/formaDePago.routes.js'
import pagoRoutes from './routes/pago.routes.js'
import carritoRoutes from './routes/carrito.routes.js'
import envioRoutes from './routes/envio.routes.js'

const app = express();

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(caregoriaRoutes)
app.use(marcaRoutes)
app.use(usuarioRoutes)
app.use(productoRoutes)
app.use(tipoProductoRoutes)
app.use(imagenRoutes)
app.use(productoCategoriaRoutes)
app.use(productoMarcaRoutes)


app.use(carritoRoutes)
app.use(tipoFormaDePagoRoutes)

app.use(formaDePagoRoutes)
app.use(pagoRoutes)
app.use(envioRoutes)


//app.use(express.static('./client/src/imagenesDB/'))

app.listen(PORT)
console.log(`server is running on port ${PORT}`)

