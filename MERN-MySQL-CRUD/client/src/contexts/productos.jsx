import { createContext, useState, useContext, useEffect } from "react";
import { getProductosRequest, getProductoRequest, } from '../api/productos.api.js'

export const ProductoContext = createContext()


export function useProductos() {

    const context = useContext(ProductoContext)
    if (!context) {
        throw new Error("UseProductos no puede unsarse aquí")
    }
    return context
}

export const ProductoProvider = ({ children }) => {

    const [productos, setProductos] = useState([])
    const [imagenesActivas, setImagenesActivas] = useState([])

    useEffect(() => {
        loadProductos()
    }, [])

    const loadProductos = async () => {
        try {
            const response = await getProductosRequest()
            setProductos(response.data.result)
        } catch (error) {
            console.error(error)
        }

    }

    const cargarImagenes = (imagen) => {

        if (imagen != undefined) {
            console.log(1);
            setImagenesActivas([...imagenesActivas, imagen])            
        }
        else
            console.log("No llegaron imagenes");

    }
    const eliminarImagenes = () => {
        console.log(imagenesActivas);
        setImagenesActivas([])
        console.log(imagenesActivas);
        console.log("Imagenes eliminadas");
    }

    const getProducto = async (id) => {
        try {
            const result = await getProductoRequest(id)
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ProductoContext.Provider value={{ productos, imagenesActivas, getProducto, cargarImagenes }}>
            {children}
        </ProductoContext.Provider>
    )
}