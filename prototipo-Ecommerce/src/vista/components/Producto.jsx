import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import '../styles/producto.css'
import { products } from '../../modelo/mocks/products.json'
import { altaProducto } from '../../modelo/mProducto'

export const Producto = () => {

    const [lista, setlista] = useState(() => {
        return products
    })

    useEffect(() => {
        console.log('Hola')
    }, [])


    function mostarCategorias() {
        altaProducto();
    }

    return (

        <section className="listaProductos">
            {
                lista.map((producto, index) => {
                    return (
                        <div key={index} className='producto'>
                            <strong>{producto.id}</strong>
                            <strong>{producto.title}</strong>
                            <img className='imgProducto' src={producto.thumbnail} alt="imagen del Producto" />
                            <button className='btnAddCart' onClick={mostarCategorias}> Boton</button>
                        </div>
                    )
                }
                )
            }
        </section>

    )
}

Producto.propTypes = {
    producto: PropTypes.object
}


