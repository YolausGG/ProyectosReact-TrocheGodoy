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

router.get('/producto/:idProducto', getProducto)

router.get('/productosCategorias', getProductosCategorias)

router.post('/producto', createProducto)

router.put('/producto/:idProducto', updateProducto)

router.delete('/producto/:idProducto', deleteProducto)

export default router