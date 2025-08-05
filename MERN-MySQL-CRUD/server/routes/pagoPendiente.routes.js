import { Router } from "express"

import { getPagosPendientes, getPagoPendienteIdUsuario, createPagoPendiente, deletePagoPendiente, updatePagoPendiente } from "../controllers/pagoPendiente.controllers.js"

const router = Router()

// Rutas para los pagos pendientes
router.get('/pagosPendientes', getPagosPendientes)
router.get('/pagoPendiente/:idUsuario', getPagoPendienteIdUsuario)      
router.post('/pagoPendiente', createPagoPendiente)
router.delete('/pagoPendiente/:id', deletePagoPendiente)    
router.put('/pagoPendiente/:id', updatePagoPendiente)

export default router
