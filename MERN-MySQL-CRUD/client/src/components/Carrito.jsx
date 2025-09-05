import PropTypes from 'prop-types'
import { useCarrito } from '../contexts/carrito.jsx'
import ProductoCarrito from './ProductoCarrito.jsx'

function Carrito() {

  const { precioTotal, productosCarrito  } = useCarrito()


  return (
    <aside id='container-carrito' className='container-carrito open'>
      <section className='container-productos-carrito'>
        {
          productosCarrito?.map(producto => (
            <ProductoCarrito key={producto.idProducto} producto={producto} />
          ))
        }
      </section>
      <div className='container-calculo-y-btn-compra' >
        <div className='contaiener-suma-total'>
          <>
            {
              productosCarrito?.map(producto => (
                <p key={producto.idProducto}>{producto.precio * producto.cantidad}</p>
              ))
            }
          </>

          <strong>{precioTotal}</strong>
        </div>
        <button className='btn-comprar-carrito'>
          Comprar
        </button>
      </div>
    </aside>
  )
}

Carrito.propTypes = {}

export default Carrito
