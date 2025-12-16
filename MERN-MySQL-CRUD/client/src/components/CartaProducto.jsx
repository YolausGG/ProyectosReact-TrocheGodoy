import PropTypes from 'prop-types'
import addCartIcon from '../utils/icons/add-shopping-cart.png'
import { useCarrito } from '../contexts/carrito';
import { Link, useNavigate } from 'react-router-dom';

function CartaProducto({ producto }) {

    const { agregarAlCarrito } = useCarrito()

    const navigate = useNavigate()

    return (
        <div className='cardProducto'>
            <img className='imgProducto' src={producto.imagenes[0]?.URLImagen} alt={`imagen de ${producto.nombre}`} />
            <div className='datosProducto'>
                <h4>{producto.nombre}</h4>
                <strong>${producto.precio}</strong>
                {producto.marcas.map(marca => (<span key={marca.idMarca} className='marca'>{marca.nombre}</span>))}
            </div>
            <div className='container-btns-compra'>

                <button className='btn-comprar' onClick={() => { agregarAlCarrito(producto), navigate('/ConfirmarCompra') }}>
                    Comprar
                </button>
                <a className='btn-agregar-al-carrito' onClick={() => agregarAlCarrito(producto)} >
                    <img className='icon-add-carrito' src={addCartIcon} alt={`Agregar ${producto.nombre} al carrito`} />
                </a>
            </div>
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
    imagenes: PropTypes.array,
    categorias: PropTypes.array,
    marcas: PropTypes.array,
    ofertas: PropTypes.array
}