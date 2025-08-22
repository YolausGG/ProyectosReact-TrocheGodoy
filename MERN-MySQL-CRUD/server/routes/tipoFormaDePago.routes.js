import { Router } from "express";
import {
    getFormaDePagoPagoOnline, getFormaDePagoPagoOnlineId, createFormaDePagoPagoOnline,updateFormaDePagoPagoOnline, deleteFormaDePagoPagoOnline,
    getFormaDePagoEfectivo, getFormaDePagoEfectivoId, createFormaDePagoEfectivo, updateFormaDePagoEfectivo, deleteFormaDePagoEfectivo,
    getFormaDePagoTransferencia, getFormaDePagoTransferenciaId, createFormaDePagoTransferencia, updateFormaDePagoTransferencia, deleteFormaDePagoTransferencia
} from "../controllers/tipoFormaDePago.controllers.js";

const router = Router()

// Pago Online
router.get('/pagosOnline', getFormaDePagoPagoOnline);
router.get('/pagoOnline/:id', getFormaDePagoPagoOnlineId);
router.post('/pagoOnline/:id', createFormaDePagoPagoOnline);
router.put('/pagoOnline/:id', updateFormaDePagoPagoOnline);
router.delete('/pagoOnline/:id', deleteFormaDePagoPagoOnline);    

// Efectivo

router.get('/efectivo', getFormaDePagoEfectivo);
router.get('/efectivo/:id', getFormaDePagoEfectivoId);
router.post('/efectivo/:id', createFormaDePagoEfectivo);
router.put('/efectivo/:id', updateFormaDePagoEfectivo);
router.delete('/efectivo/:id', deleteFormaDePagoEfectivo);

// Transferencia

router.get('/transferencias', getFormaDePagoTransferencia);
router.get('/transferencia/:id', getFormaDePagoTransferenciaId);  
router.post('/transferencia/:id', createFormaDePagoTransferencia);
router.put('/transferencia/:id', updateFormaDePagoTransferencia);
router.delete('/transferencia/:id', deleteFormaDePagoTransferencia);

export default router;