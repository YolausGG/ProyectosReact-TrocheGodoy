import { createContext, useState, useContext, useEffect } from "react";
import { getProductosRequest, getProductoRequest, } from '../api/productos.api.js'
import { getImagenesRequest } from "../api/imagenes.api.js";
import { getCategoriasIdCategoria } from "../../../server/controllers/productoCategoria.controllers.js";

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
    const [imagenes, setImagenes] = useState([])

    useEffect(() => {
        loadProductos()
        loadImagenes()
    }, [])

    const loadProductos = async () => {
        try {
            var productosFinal = []
            const response = await getProductosRequest()

            /*response.data.result.map(prod => {
                            var producto = {
                                nombre: "",
                                precio: "",
                                talle: "",
                                color: "",
                                stock: "",
                                descripcion: "",
                                categorias: [],
                                ofertas: [],
                                imagenes: [],
                                marcas: []
                            }
            
                            const responsePC = getCategoriasIdCategoria(prod.idProducto)
                            console.log(responsePC);
                            producto.categorias = responsePC.data.result
                            productosFinal.push(producto)
                        })
            */
            setProductos(response.data.result)
        } catch (error) {
            console.error(error)
        }

    }

    const loadImagenes = async () => {
        try {
            const response = await getImagenesRequest()
            setImagenes(response.data.result)
        } catch (error) {
            console.error(error)
        }

    }

    const cargarImagenes = (imagen) => {

        if (imagen != undefined) {
            console.log(1);
            setImagenes([...imagenes, imagen])
        }
        else
            console.log("No llegaron imagenes");

    }
    const eliminarImagenes = () => {

        setImagenes([])
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
        <ProductoContext.Provider value={{ productos, imagenes, getProducto, eliminarImagenes }}>
            {children}
        </ProductoContext.Provider>
    )
}