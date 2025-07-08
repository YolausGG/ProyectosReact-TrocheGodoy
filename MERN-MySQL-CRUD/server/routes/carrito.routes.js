import { Router } from 'express';

import { getCarrito, addToCarrito, deleteFromCarrito, vaciarCarrito, updateCarrito } from '../controllers/carrito.controllers.js';

const router = Router();

// Rutas para el carrito
router.get('/carrito/:idUsuario', getCarrito);
router.post('/carrito', addToCarrito);
router.delete('/carrito/:idUsuario/:idProducto', deleteFromCarrito);
router.delete('/carrito/:idUsuario', vaciarCarrito);
router.put('/carrito/:idUsuario', updateCarrito);


export default router;

