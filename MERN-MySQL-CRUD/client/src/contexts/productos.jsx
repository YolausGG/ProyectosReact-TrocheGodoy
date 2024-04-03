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

    ])
    const [imagenes, setImagenes] = useState([

    ])

    useEffect(() => {
        loadProductos()
        //loadImagenes()
    }, [])

    const loadProductos = async () => {
        try {
            const response = await getProductosRequest()
            try {
                const responses = await Promise.allSettled(
                    response.data.result.map(async (prod) => {
                        var producto = {
                            idProducto: prod.idProducto,
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
                        const responseImagenes = await getImagenesIdProductoRequest(prod.idProducto)
                        responseImagenes.status === 200 ? producto.imagenes = responseImagenes.data.result : producto.imagenes = []
                        
                        const responseCategorias = await getCategoriasIdProductoRequest(prod.idProducto)
                        responseCategorias.status === 200 ? producto.categorias = responseCategorias.data.result : producto.categorias = []
                                                
                        return producto
                    })
                )
                var allProducts = responses.map(item => (item.status == 'fulfilled' ? item.value : null))
                
                console.log(allProducts);
                setProductos(allProducts)

            } catch (error) {
                console.error(error);
            }


            setProductos(allProducts)
        } catch (error) {
            console.error(error)
        }
    }


    const loadImagenes = async () => {
        try {
            const response = await getImagenesRequest()
            console.log(response.data.result);
            setImagenes(response.data.result)
        } catch (error) {
            console.error(error)
        }

    }

    const cargarImagenes = () => {
        //var newArray = [] 
        productos.map(async prod => {
            const response = await getImagenesIdProductoRequest(prod.idProducto)
            console.log(response.data.result);
            prod.imagenes = response.data.result
            //newArray.push(prod)      

        })
        //console.log(newArray); 
        //setProductos(newArray)
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