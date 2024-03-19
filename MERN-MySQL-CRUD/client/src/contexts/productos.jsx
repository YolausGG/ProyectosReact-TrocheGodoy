import { createContext, useState, useContext, useEffect } from "react";
import { getProductosRequest, getProductoRequest, } from '../api/productos.api.js'
import { getImagenesIdProductoRequest, getImagenesRequest } from "../api/imagenes.api.js";
import { getCategoriasIdProductoRequest } from '../api/productoCategoria.api.js'


export const ProductoContext = createContext()


export function useProductos() {

    const context = useContext(ProductoContext)
    if (!context) {
        throw new Error("UseProductos no puede unsarse aquí")
    }
    return context
}

export const ProductoProvider = ({ children }) => {

    const [productos, setProductos] = useState([
        {
            idProducto: 0,
            nombre: "",
            precio: 0,
            talle: "",
            color: "",
            stock: 0,
            descripcion: "",
            categorias: [],
            ofertas: [],
            imagenes: [],
            marcas: []
        }
    ])
    const [imagenes, setImagenes] = useState([])

    useEffect(() => {
        loadProductos()
        loadImagenes()
        cargarImagenes()
    }, [])

    const loadProductos = async () => {
        try {
            //var productosFinal = []
            const response = await getProductosRequest()
            console.log(response.data.result);
            /*response.data.result.map(async (prod) => {
                var producto = {
                    nombre: prod.nombre,
                    precio: prod.precio,
                    talle: "",
                    color: "",
                    stock: "",
                    descripcion: prod.descripcion,
                    categorias: [],
                    ofertas: [],
                    imagenes: [],
                    marcas: []
                }

                const responsePC = await getCategoriasIdProductoRequest(prod.idProducto)               
                responsePC.status === 200 ? producto.categorias = responsePC.data.resul : producto.categorias = []

                productosFinal.push(producto)
            })*/

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

    const cargarImagenes = () => {
        var newArray = [] 
        productos.map(async prod => {                       
            const response = await getImagenesIdProductoRequest(prod.idProducto)
            console.log(response.data.result);
            prod.imagenes = response.data.result
            newArray.push(prod)      
                 
        })
        console.log(newArray); 
        setProductos(newArray)
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