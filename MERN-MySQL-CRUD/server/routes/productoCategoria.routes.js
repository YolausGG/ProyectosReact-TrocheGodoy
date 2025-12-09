import { Router } from "express";
import {
    getCategoriasIdProducto,
    createCategoriasProducto,
    deleteCategoriaProducto 
} from '../controllers/productoCategoria.controllers.js'

const router = Router()

router.get('/categoriasProducto/:idProducto', getCategoriasIdProducto)
router.post('/categoriasProducto', createCategoriasProducto)
router.delete('/categoriasProducto/producto/:idProducto/:idCategoria', deleteCategoriaProducto)

export default router
