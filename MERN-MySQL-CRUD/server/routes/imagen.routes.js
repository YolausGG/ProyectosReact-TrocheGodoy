import { Router } from "express";
import {
    getImagenes, createImagen,
    getImagenesIdProducto
} from '../controllers/imagen.controllers.js'

const router = Router()

router.get('/imagenes', getImagenes)

router.get('/imagenes/:idProducto', getImagenesIdProducto)

router.post('/imagen/:idProducto', createImagen)


export default router