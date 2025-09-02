import { Router } from "express"

import { getDirecciones, getDireccionId, getDireccionesIdUsuario, createDireccion, deleteDireccion, updateDireccion } from "../controllers/direccion.controllers.js"

const router = Router()

// Rutas para los Envios

router.get('/direcciones', getDirecciones)
router.get('/direccion/:idDireccion', getDireccionId)
router.get('/direccionesUsuario/:idUsuario', getDireccionesIdUsuario)     
router.post('/direccion', createDireccion)
router.put('/direccion/:idDireccion', updateDireccion)
router.delete('/direccion/:idDireccion', deleteDireccion)

export default router