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

router.get('/productoTalleColor/:idProducto', getProductosTalleColorIdProducto)

router.post('/productoTalleColor', createProductoTalleColor)

router.put('/productoTalleColor', updateProductoTalleColor)

router.delete('/productoTalleColor', deleteProductoTalleColor)

export default router