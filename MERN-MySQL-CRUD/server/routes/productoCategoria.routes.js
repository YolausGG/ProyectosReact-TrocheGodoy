import { Router } from "express";
import {
    getCategoriasIdProducto
    
} from '../controllers/productoCategoria.controllers.js'

const router = Router()

router.get('/categoriasProducto/:id', getCategoriasIdProducto)

export default router
