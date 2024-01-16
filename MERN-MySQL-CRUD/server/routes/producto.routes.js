import { Router } from "express";
import {
    getProductos,
    getProducto,
    getProductosCategorias,
    createProducto,
    updateProducto,
    deleteProducto
    
} from '../controllers/producto.controllers.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/producto/:id', getProducto)

router.get('/productosCategorias', getProductosCategorias)

router.post('/producto', createProducto)

router.put('/producto/:id', updateProducto)

router.delete('/producto/:id', deleteProducto)

export default router