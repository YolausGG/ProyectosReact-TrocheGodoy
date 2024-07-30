import { Router } from "express";
import { getMarcas, getMarca, createMarca, updateMarca, deleteMarca } from '../controllers/marca.controllers.js'

const router = Router()

router.get('/marcas', getMarcas);

router.get('/marca/:id', getMarca);

router.post('/marca', createMarca);

router.put('/marca/:id', updateMarca);

router.delete('/marca/:id', deleteMarca);

export default router