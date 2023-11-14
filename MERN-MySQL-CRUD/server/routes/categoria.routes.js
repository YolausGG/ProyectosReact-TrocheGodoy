import { Router } from "express";
import {
    getCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from '../controllers/categoria.controllers.js'
const router = Router()

router.get('/categorias',getCategorias)

router.get('/categoria/:id', getCategoria)

router.post('/categoria', createCategoria)

router.put('/categoria/:id', updateCategoria)

router.delete('/categoria/:id', deleteCategoria)

export default router