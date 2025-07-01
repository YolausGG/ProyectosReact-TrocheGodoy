import React from 'react';
import { useCarrito } from '../contexts/carrito';
import ProductoCompraFinal from '../components/ProductoCompraFinal';

function ConfirmarCompra() {

    const { productosCarrito, precioTotal } = useCarrito();

    return (
        <div className='container-confirmar-compra'>
            <h2>Confirmar Compra</h2>
            <div className='container-productos-confirmar'>
                {
                    productosCarrito?.map(producto => (
                        <ProductoCompraFinal key={producto.idProducto} producto={producto} />
                    ))
                }
            </div>
            <p>Precio total: {precioTotal}</p>
            <button className='btn-confirmar-compra'>Confirmar Compra</button>
        </div>
    );
}

export default ConfirmarCompra;