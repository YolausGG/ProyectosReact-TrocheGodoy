import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";

export const CarritoContext = createContext()

export function useCarrito() {

    const context = useContext(CarritoContext)
    if (!context) {
        throw new Error("UseProductos no puede unsarse aquí")
    }
    return context
}

export const CarritoProvider = ({ children }) => {
    const productosIniciales = [
        { idProducto: 155, nombre: 'Camisa rayada', precio: 1900.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
        { idProducto: 256, nombre: 'Camisa Bordo', precio: 1950.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
        { idProducto: 324, nombre: 'Camisa bOrdo', precio: 1500.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
        { idProducto: 464, nombre: 'Camisa boRdo', precio: 1400.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
        { idProducto: 521, nombre: 'Camisa borDo', precio: 1100.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
        { idProducto: 633, nombre: 'Camisa bordO', precio: 1300.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2F182%20CHOPPED%20RED.webp?alt=media&token=1a47890c-c0fb-49a4-a242-013ce4eb168f' }] },
    ]

    const [productosCarrito, setProductosCarrito] = useState(productosIniciales)

    const [precioTotal, setPrecioTotal] = useState(0)

    const calcultarPrecioTotal = () => {
        var total = 0
        productosCarrito.map(prod => {
            total = total + prod.precio * prod.cantidad
        })
        setPrecioTotal(total)
    }

    useEffect(() => {
        
        calcultarPrecioTotal()
    },[productosCarrito])

    const agregarAlCarrito = (pProducto) => {

        var indexProduct = productosCarrito.findIndex(prod => prod.idProducto == pProducto.idProducto)
        //console.log(indexProduct);

       // console.log(pProducto);

        var newProducto = ({
            idProducto: pProducto.idProducto,
            nombre: pProducto.nombre,
            precio: pProducto.precio,
            cantidad: pProducto.cantidad == undefined ? 1 : pProducto.cantidad,
            imagenes: pProducto.imagenes
        })
        if (indexProduct >= 0) {
            productosCarrito.splice(indexProduct, 1, newProducto)
            setProductosCarrito(productosCarrito)
        } else {
            setProductosCarrito([...productosCarrito, newProducto])

        }

        calcultarPrecioTotal()
    }

    const quitarDelCarrito = (idProducto) => {

        try {
            //const response = await deleteCategoriaRequest(id)

            // if (response.status == 204) {
            setProductosCarrito(productosCarrito.filter(prod => prod.idProducto !== idProducto))
            
            // }
        } catch (error) {
            console.error(error)
        }
    }

    const vaciarCarrito = () => {
        setProductosCarrito([])
        setPrecioTotal(0)
    }



    return (
        <CarritoContext.Provider value={{ productosCarrito, precioTotal, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    )
}

CarritoProvider.propTypes = {
    children: PropTypes.array.isRequired,
};




