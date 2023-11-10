import express from 'express';
import { PORT } from './config.js';

import indexRoutes from './routes/index.routes.js'
import caregoriaRoutes from './routes/categoria.routes.js'

const app = express();

app.use(express.json())

app.use(indexRoutes)
app.use(caregoriaRoutes)

app.listen(PORT)
console.log(`server is running on port ${PORT}`)

