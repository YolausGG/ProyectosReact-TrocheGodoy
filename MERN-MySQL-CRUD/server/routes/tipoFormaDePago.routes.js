import { Router } from "express";
import {
    getFormaDePagoContado, getFormaDePagoContadoId, createFormaDePagoContado,updateFormaDePagoContado, deleteFormaDePagoContado,
    getFormaDePagoDeposito, getFormaDePagoDepositoId, createFormaDePagoDeposito, updateFormaDePagoDeposito, deleteFormaDePagoDeposito,
    getFormaDePagoTarjeta, getFormaDePagoTarjetaId, createFormaDePagoTarjeta, updateFormaDePagoTarjeta, deleteFormaDePagoTarjeta
} from "../controllers/tipoFormaDePago.controllers.js";

const router = Router()

// Tarjeta
router.get('/tarjetas', getFormaDePagoTarjeta);
router.get('/tarjeta/:id', getFormaDePagoTarjetaId);
router.post('/tarjeta/:id', createFormaDePagoTarjeta);
router.put('/tarjeta/:id', updateFormaDePagoTarjeta);
router.delete('/tarjeta/:id', deleteFormaDePagoTarjeta);    

// Contado

router.get('/contados', getFormaDePagoContado);
router.get('/contado/:id', getFormaDePagoContadoId);
router.post('/contado/:id', createFormaDePagoContado);
router.put('/contado/:id', updateFormaDePagoContado);
router.delete('/contado/:id', deleteFormaDePagoContado);

// Deposito

router.get('/depositos', getFormaDePagoDeposito);
router.get('/deposito/:id', getFormaDePagoDepositoId);  
router.post('/deposito/:id', createFormaDePagoDeposito);
router.put('/deposito/:id', updateFormaDePagoDeposito);
router.delete('/deposito/:id', deleteFormaDePagoDeposito);

export default router;