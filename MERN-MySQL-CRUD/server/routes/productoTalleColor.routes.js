import { Router } from "express";
import {
    getProductosTalleColor,
    getProductoTalleColor,
    createProductoTalleColor,
    updateProductoTalleColor,
    deleteProductoTalleColor,
    getProductosTalleColorIdProducto
    
} from '../controllers/productoTalleColor.controllers.js'

const router = Router()

router.get('/productosTalleColor', getProductosTalleColor)

router.get('/productoTalleColor/:id', getProductoTalleColor)

router.get('/productoTalleColorIdProducto/:idProducto', getProductosTalleColorIdProducto)

router.post('/productoTalleColor', createProductoTalleColor)

router.put('/productoTalleColor/:id', updateProductoTalleColor)

router.delete('/productoTalleColor/:id', deleteProductoTalleColor)

export default router