import { useEffect } from "react"
import CartaProducto from "../components/CartaProducto.jsx"
import '../styles/producto.css'
import { useProductos } from "../contexts/productos.jsx"

export default function Productos() {

    const { productos } = useProductos()
   
    useEffect(() => {
        
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
