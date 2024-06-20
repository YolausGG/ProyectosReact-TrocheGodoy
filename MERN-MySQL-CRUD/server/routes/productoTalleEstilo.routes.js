import { Router } from "express";
import {
    getProductosTalleEstilo,
    getProductoTalleEstilo,
    createProductoTalleEstilo,
    updateProductoTalleEstilo,
    deleteProductoTalleEstilo,
    getProductosTalleEstiloIdProducto
    
} from '../controllers/productoTalleEstilo.controllers.js'

const router = Router()

router.get('/productosTalleEstilo', getProductosTalleEstilo)

router.get('/productoTalleEstilo/:id', getProductoTalleEstilo)

router.get('/productoTalleEstiloIdProducto/:idProducto', getProductosTalleEstiloIdProducto)

router.post('/productoTalleEstilo', createProductoTalleEstilo)

router.put('/productoTalleEstilo/:id', updateProductoTalleEstilo)

router.delete('/productoTalleEstilo/:id', deleteProductoTalleEstilo)

export default router