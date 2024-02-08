import { Router } from "express";

import {
    getImagenes,
    createImagen,    
} from '../controllers/imagen.controllers.js'

const router = Router()

router.get('/imagenes', getImagenes);

router.post('/imagen', createImagen)


export default router