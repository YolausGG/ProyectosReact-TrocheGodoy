import { createContext, useState, useContext } from "react";
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


    const loadProductos = async () => {
        try {
            const response = await getProductosRequest()
            setProductos(response.data.result)
        } catch (error) {
            console.error(error)
        }

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
        <ProductoProvider.Provider value={{ productos, loadProductos, getProducto }}>
            {children}
        </ProductoProvider.Provider>
    )
}