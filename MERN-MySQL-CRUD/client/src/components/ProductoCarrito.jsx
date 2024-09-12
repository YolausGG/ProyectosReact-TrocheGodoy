import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import cerrar from '../utils/icons/cerrar.webp'
import { useCarrito } from '../contexts/carrito.jsx'

function ProductoCarrito({ producto }) {

    const { agregarAlCarrito, quitarDelCarrito } = useCarrito()

    const [cantidad, setCantidad] = useState(producto.cantidad)


    const sumarCantidad = () => {
        agregarAlCarrito({
            idProducto: producto.idProducto,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            imagenes: producto.imagenes
        })
    }

    useEffect(() => {
        sumarCantidad()
        //npm install eslint-plugin-react-hooks@next
    }, [cantidad])

    return (
        <div className='container-producto-carrito'>
            <img className='img-producto-carrito' src={producto.imagenes[0]?.URLImagen} alt={`Imagen de ${producto.nombre}`} />
            <div>
                <h3>{producto.nombre}</h3>
                <strong>${producto.precio}</strong>
                <div className='container-cantidad'>
                    <label>Cantidad</label>
                    <a className='sumar-producto' onClick={() => { cantidad > 1 ? setCantidad(parseFloat(cantidad) - 1) : null }}>
                        -
                    </a>
                    <input name='canitdad' className='inp-cantidad-prodcuto' onChange={(e) => { setCantidad(e.target.value) }} value={cantidad} type="number" min={1} id={`idProducto:${producto.idProducto}`} />
                    <a className='sumar-producto' onClick={() => { setCantidad(parseFloat(cantidad) + 1) }}>
                        +
                    </a>
                </div>
            </div>
            <div>
                ${producto.precio * producto.cantidad}
            </div>

            <i className='quitar-producto-carrito' onClick={() => { quitarDelCarrito(producto.idProducto) }}>
                <img className='icon-quitar-producto-carrito' src={cerrar} alt="Quitar Producto" />
            </i>

        </div>
    )
}

ProductoCarrito.propTypes = {
    producto: PropTypes.object.isRequired,
    imagenes: PropTypes.array,
    productosCarrito: PropTypes.array
}

export default ProductoCarrito
