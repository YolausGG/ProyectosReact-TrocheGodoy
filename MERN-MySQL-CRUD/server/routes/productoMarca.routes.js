import { Router } from "express";
import {
    getMarcasIdProducto,
    createMarcasProducto,
    deleteMarcasProducto
} from '../controllers/productoMarca.controllers.js'

const router = Router()

router.get('/marcasProducto/:id', getMarcasIdProducto)

router.post('/marcasProducto', createMarcasProducto)

router.delete('/marcasProducto/producto/:idProducto/:idMarca', deleteMarcasProducto)

export default router