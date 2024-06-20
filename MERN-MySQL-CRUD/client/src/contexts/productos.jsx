import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";
import { getProductosRequest, getProductoRequest, } from '../api/productos.api.js'
import { getImagenesIdProductoRequest } from "../api/imagenes.api.js";
import { getCategoriasIdProductoRequest } from '../api/productoCategoria.api.js'
import { getMarcasIdProductoRequest } from '../api/productoMarca.api.js'
import { getProductosTalleEstiloIdProductoRequest } from "../api/prodcutosTalleEstilo.api.js";


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
                            estilo: "",
                            stock: "",
                            descripcion: prod.descripcion,
                            categorias: [],
                            ofertas: [],
                            imagenes: [],
                            marcas: []
                        }

                        try {
                            const responseImagenes = await getImagenesIdProductoRequest(prod.idProducto)                           
                            responseImagenes.status === 200 ? producto.imagenes = responseImagenes.data.result : producto.imagenes = []

                        } catch (error) {
                            console.error(error);
                        }

                        try {
                            const responseCategorias = await getCategoriasIdProductoRequest(prod.idProducto)
                            responseCategorias.status === 200 ? producto.categorias = responseCategorias.data.result : producto.categorias = []

                        } catch (error) {
                            console.error(error);
                        }

                        try {
                            const responseMarcas = await getMarcasIdProductoRequest(prod.idProducto)
                            responseMarcas.status === 200 ? producto.marcas = responseMarcas.data.result : producto.marcas = []

                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            const responsePTC = await getProductosTalleEstiloIdProductoRequest(prod.idProducto)
                            console.log(responsePTC.data);
                            if (responsePTC.status === 200) {
                                producto.talle = responsePTC.data.talle
                                producto.estilo = responsePTC.data.estilo
                                producto.stock = responsePTC.data.stock
                            }

                        } catch (error) {
                            console.error(error);
                        }
                        return producto
                    })
                )
                var allProducts = responses.map(item => isFulfilled(item))

            } catch (error) {
                console.error(error);
            }
            setProductos(allProducts)

        } catch (error) {
            console.error(error)
        }
    }

    const isFulfilled = (item) => {
        if (item.status == 'fulfilled') {
            return item.value
        }
        else {
            return null
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
        <ProductoContext.Provider value={{ productos, getProducto, loadProductos }}>
            {children}
        </ProductoContext.Provider>
    )
}


ProductoProvider.propTypes = {
    children: PropTypes.array.isRequired,
};