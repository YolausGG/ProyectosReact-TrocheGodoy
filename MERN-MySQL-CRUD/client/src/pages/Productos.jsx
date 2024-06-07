import { useEffect, useState } from "react"
import CartaProducto from "../components/CartaProducto.jsx"
import PropTypes from 'prop-types'
import { useProductos } from "../contexts/productos.jsx"

export default function Productos() {

    const { productos } = useProductos()

    useEffect(() => {
    }, [])

    return (
        <>
            <h2 className="tituloPagina">Productos</h2>
            <section className="productosContainer">
                {
                    productos.map(producto => (
                        <CartaProducto key={producto.idProducto} producto={producto} />
                    ))
                }
            </section>
        </>
    )
}

Productos.propTypes = {
    productos: PropTypes.array,
    imagenes: PropTypes.array
}
