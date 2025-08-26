import { Router } from "express"

import { getEnvios, getEnvioId, getEnviosIdDireccion, createEnvio, deleteEnvio, updateEnvio, updateEstadoEnvio } from "../controllers/envio.controllers.js"

const router = Router()

// Rutas para los Envios

router.get('/envios', getEnvios)
router.get('/envio/:idEnvio', getEnvioId)
router.get('/envios/:idDireccion', getEnviosIdDireccion)
router.post('/envio', createEnvio)
router.put('/envio/:idEnvio', updateEnvio)
router.put('/envio/updateEstado/:idEnvio', updateEstadoEnvio)
router.delete('/envio/:idEnvio', deleteEnvio)

export default router