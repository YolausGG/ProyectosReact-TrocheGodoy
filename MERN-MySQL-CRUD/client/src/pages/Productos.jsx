import { useEffect, useState } from "react"
import CartaProducto from "../components/CartaProducto.jsx"
import PropTypes from 'prop-types'
import { useProductos } from "../contexts/productos.jsx"

export default function Productos() {

    const { productos } = useProductos()

    const [filtros, setFiltros] = useState({
        categoria: 'todo'.toLowerCase(),
        marca: 'todo'.toLowerCase(),
        nombre: 'todo'.toLowerCase()
    })

    const filtrarProductos = (pProductos) => {
        return pProductos?.filter(producto => {
            return (
                (producto.categorias.includes(filtros.categoria) || filtros.categoria == 'todo') &&
                (producto.marcas.includes(filtros.marca) || filtros.marca == 'todo') &&
                (producto.nombre.toLowerCase().includes(filtros.nombre) || filtros.nombre == 'todo')
            )
        })
    }

    const productosFilitrados = filtrarProductos(productos)

    return (
        <>
            <h2 className="tituloPagina">Productos</h2>
            <section className="productosContainer">
                {
                    productosFilitrados.map(producto => (
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
