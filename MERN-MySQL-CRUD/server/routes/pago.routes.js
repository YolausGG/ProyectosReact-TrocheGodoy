import { Router } from "express"

import { getPagos, getPago, createPago, updatePago, deletePago } from "../controllers/pago.controllers.js"


const router = Router()

// Rutas para los pagos

router.get('/pagos', getPagos)
router.get('/pago/:idPago', getPago)
router.post('/pago', createPago)
router.put('/pago/:idPago', updatePago)
router.delete('/pago/:idPago', deletePago)

export default router