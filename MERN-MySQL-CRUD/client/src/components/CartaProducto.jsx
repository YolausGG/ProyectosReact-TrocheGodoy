import PropTypes from 'prop-types'

import imgDefult from '../images/iconCamisa2.png'

function CartaProducto( {producto} ) {
    return (
        <div className='cardProducto'>
            <img className='imgProducto' src={imgDefult} alt="imagen de producto" />
            <div className='datosProducto'>
                <h4>{producto.nombre}</h4>
                <strong>${producto.precio}</strong>
            </div>
            <div className='datosProducto'>
                <label>Talle: {producto.talle}</label>
                <label>Stock: {producto.stock}</label>
            </div>
            <label>{producto.descripcion}</label>
        </div>
    )
}

export default CartaProducto


CartaProducto.propTypes = {
    producto: PropTypes.object.isRequired,
    nombre: PropTypes.string,
    precio: PropTypes.number,
    talle: PropTypes.string,
    stock: PropTypes.number,
    descripcion: PropTypes.string,
    imagen: PropTypes.string
}