import { useEffect, useState } from "react"
import { getProductosRequest } from "../api/productos.api.js"
import CartaProducto from "../components/CartaProducto.jsx"
import '../styles/producto.css'

export default function Productos() {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const response = await getProductosRequest()
                console.log(response);
                setProductos(response.data.result)
            } catch (error) {
                console.error(error)
            }
    
        }
        cargarProductos()
    }, [])
   
    console.log(productos);
    return (
        <>
            <h2 className="tituloPagina">Productos</h2>
            <section className="productosContainer">
                {                    
                    productos.map((producto) => (
                        <CartaProducto key={producto.idProducto} producto={producto}/>
                    ))
                }
            </section>
        </>
    )
}
