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
        { idProducto: 155, nombre: 'Camisa rayada', precio: 1900.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-rayas-simple.webp?alt=media&token=6aabb0c9-ad84-49fa-af2e-bc6eb4f93e6d' }] },
        { idProducto: 256, nombre: 'Camisa Bordo', precio: 1950.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-hombre-bordo-lila.webp?alt=media&token=d5c55746-a322-454d-b747-368313354a48' }] },
        { idProducto: 324, nombre: 'Camisa bOrdo', precio: 1500.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-hombre-bordo-lila.webp?alt=media&token=d5c55746-a322-454d-b747-368313354a48' }] },
        { idProducto: 464, nombre: 'Camisa boRdo', precio: 1400.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-hombre-bordo-lila.webp?alt=media&token=d5c55746-a322-454d-b747-368313354a48' }] },
        { idProducto: 521, nombre: 'Camisa borDo', precio: 1100.00, cantidad: 2, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-hombre-bordo-lila.webp?alt=media&token=d5c55746-a322-454d-b747-368313354a48' }] },
        { idProducto: 633, nombre: 'Camisa bordO', precio: 1300.00, cantidad: 1, imagenes: [{ URLImagen: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-images-4cfcf.appspot.com/o/imagenes%2Fcamisa-hombre-bordo-lila.webp?alt=media&token=d5c55746-a322-454d-b747-368313354a48' }] },
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

    const agregarAlCarrito = (pProducto) => {


        var indexProduct = productosCarrito.findIndex(prod => prod.idProducto == pProducto.idProducto)
        console.log(indexProduct);

        console.log(pProducto);

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



    return (
        <CarritoContext.Provider value={{ productosCarrito, precioTotal, agregarAlCarrito, quitarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    )
}

CarritoProvider.propTypes = {
    children: PropTypes.array.isRequired,
};




