import React from 'react';
import PropTypes from 'prop-types'

const ProductoCompraFinal = ({ producto }) => {

    return (
        <div className='container-producto-carrito-final'>
            <img className='img-producto-carrito' src={producto.imagenes[0]?.URLImagen} alt={`Imagen de ${producto.nombre}`} />
            <div>
                <h3>{producto.nombre}</h3>
                <strong>${producto.precio}</strong>
                <div className='container-cantidad'>
                    <label>Cantidad:</label>
                    <label name='canitdad' className='inp-cantidad-prodcuto' id={`idProducto:${producto.idProducto}`} >{producto.cantidad}</label>

                </div>
            </div>
            <div className='lbl-producto-cantidad-total'>
                <label >${producto.precio * producto.cantidad}</label>
            </div>
        </div>
    );
};

ProductoCompraFinal.propTypes = {
    producto: PropTypes.object.isRequired,
    imagenes: PropTypes.array,
    productosCarrito: PropTypes.array
}

export default ProductoCompraFinal;