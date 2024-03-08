import { Router } from "express";
import {
    getCategoriasIdCategoria
    
} from '../controllers/productoCategoria.controllers.js'

const router = Router()

router.get('/categoriasProducto/:id', getCategoriasIdCategoria)

export default router
