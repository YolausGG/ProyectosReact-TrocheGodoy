import express from 'express';
import { PORT } from './config.js';
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import caregoriaRoutes from './routes/categoria.routes.js'
import marcaRoutes from './routes/marca.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express();

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(caregoriaRoutes)
app.use(marcaRoutes)
app.use(usuarioRoutes)

app.listen(PORT)
console.log(`server is running on port ${PORT}`)

