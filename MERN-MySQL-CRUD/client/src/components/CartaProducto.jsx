import PropTypes from 'prop-types'

function CartaProducto({ producto }) {

    console.log(producto);

    return (
        <div className='cardProducto'>
            <img className='imgProducto' src={producto.imagenes[0]?.URLImagen} alt={`imagen de ${producto.nombre}`}/>
            <div className='datosProducto'>
                <h4>{producto.nombre}</h4>
                <strong>${producto.precio}</strong>
            </div>
            <ul>
                {producto.marcas.map(marca => (
                    <li key={marca.idMarca} >{marca.nombre}</li>
                ))}
            </ul>
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