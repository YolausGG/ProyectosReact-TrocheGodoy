import { Router } from "express";
import {
    getMarcasIdProducto
    
} from '../controllers/productoMarca.controllers.js'

const router = Router()

router.get('/marcasProducto/:id', getMarcasIdProducto)

export default router