import { Router } from "express";
import { getFormasDePago, getFormaDePago, createFormaDePago, updateFormaDePago, deleteFormaDePago } from "../controllers/formaDePago.controllers.js";

const router = Router()

// Rutas para las formas de pago

router.get('/formasdepago', getFormasDePago);

router.get('/formadepago/:idFormaDePago', getFormaDePago);

router.post('/formadepago', createFormaDePago); 

router.put('/formadepago/:idFormaDePago', updateFormaDePago);

router.delete('/formadepago/:idFormaDePago', deleteFormaDePago);

export default router;
