import { Router } from "express";
import {
    getCalzados, getCalzado, createCalzado, deleteCalzado,
    getVestimentas, getVestimenta, createVestimenta, deleteVestimenta,
    getAccesorios, getAccesorio, createAccesorio, deleteAccesorio
} from '../controllers/tipoProducto.controllers.js'

const router = Router()

router.get('/calzados', getCalzados)
router.get('/calzado/:id', getCalzado)
router.post('/calzado/:id', createCalzado)
router.delete('/calzado/:id', deleteCalzado)

router.get('/vestimentas', getVestimentas)
router.get('/vestimenta/:id', getVestimenta)
router.post('/vestimenta/:id', createVestimenta)
router.delete('/vestimenta/:id', deleteVestimenta)

router.get('/accesorios', getAccesorios)
router.get('/accesorio/:id', getAccesorio)
router.post('/accesorio/:id', createAccesorio)
router.delete('/accesorio/:id', deleteAccesorio)

export default router