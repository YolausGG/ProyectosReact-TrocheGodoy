import { createContext, useState, useContext, useEffect } from "react";
import { getCategoriasRequest, getCategoriaRequest, deleteCategoriaRequest, createCategoriaRequest, updateCategoriaRequest } from '../api/categorias.api.js'

export const CategoriaContext = createContext()


export function useCategorias() {
    //  const [categorias, setCategorias] = useState([])
    const context = useContext(CategoriaContext)
    if (!context) {
        throw new Error("UseCategoria no puede unsarse aquí")
    }
    return context
}

export const CategoriaProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        loadCategorias()
    }, [categorias])

    const loadCategorias = async () => {
        try {
            const response = await getCategoriasRequest()
            console.log(response);
            setCategorias(response.data.result)
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoria = async (id) => {
        try {
            const response = await getCategoriaRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }

    }

    const deleteCategoria = async (id) => {
        try {
            const response = await deleteCategoriaRequest(id)
            console.log(response)
            if (response.status == 204) {
                setCategorias(categorias.filter(categorias => categorias.idCategoria !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const createCategoria = async (values) => {
        try {
            const response = await createCategoriaRequest(values)
            console.log(response)
            setCategorias([...categorias, response.data])
        } catch (error) {
            console.error(error)
        }
    }

    const updateCategoria = async (id, values) => {
        try {
            const response = await updateCategoriaRequest(id, values)
            console.log(response)
            if (response.status == 200) {
                //Terminar
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CategoriaContext.Provider value={{ categorias, loadCategorias, getCategoria, deleteCategoria, createCategoria, updateCategoria }}>
            {children}
        </CategoriaContext.Provider>
    )
}