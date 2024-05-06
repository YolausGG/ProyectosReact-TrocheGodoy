import { Router } from "express";
import {
    getCategoriasIdProducto,
    createCategoriasProducto    
} from '../controllers/productoCategoria.controllers.js'

const router = Router()

router.get('/categoriasProducto/:id', getCategoriasIdProducto)
router.post('/categoriasProducto', createCategoriasProducto)

export default router
