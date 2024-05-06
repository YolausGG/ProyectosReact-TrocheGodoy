import { Router } from "express";
import {
    getMarcasIdProducto,
    createMarcasProducto
} from '../controllers/productoMarca.controllers.js'

const router = Router()

router.get('/marcasProducto/:id', getMarcasIdProducto)

router.post('/marcasProducto', createMarcasProducto)

export default router