import { useEffect, useState } from "react"
import CartaProducto from "../components/CartaProducto.jsx"
import PropTypes from 'prop-types'
import { useProductos } from "../contexts/productos.jsx"

export default function Productos() {

    const { productos, imagenes} = useProductos()

    const [productosCompletos, setProductosCompletos] = useState([])

    useEffect(() => {
        // cargarImagenesJavaScript()
    }, [])

    const cargarImagenesJavaScript = () => {

        var newArray = []
        console.log(productos);
        console.log(imagenes);
        productos.map(prod => {
            var product = {
                idProducto: prod.idProducto,
                nombre: prod.nombre,
                precio: prod.precio,
                talle: "",
                color: "",
                stock: 0,
                descripcion: prod.descripcion,
                imagenes: [],
            }
            imagenes.map(img => {
                if (img.idProducto == prod.idProducto) {
                    product.imagenes.push(img)
                }
            })
            newArray.push(product)
        })
        console.log(newArray);
        setProductosCompletos(newArray)

    }

    console.log(productosCompletos);


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
