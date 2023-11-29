import { createContext, useState, useContext } from "react";
import { getMarcasRequest, getMarcaRequest, deleteMarcaRequest, createMarcaRequest, updateMarcaRequest } from '../api/marcas.api.js'

export const MarcaContext = createContext()


export function useMarcas() {
    
    const context = useContext(MarcaContext)
    if (!context) {
        throw new Error("UseMarca no puede unsarse aquí")
    }
    return context
}

export const MarcaProvider = ({ children }) => {

    const [marcas, setMarcas] = useState([])

    const loadMarcas = async () => {
        try {
            const response = await getMarcasRequest()
            setMarcas(response.data.result)
        } catch (error) {
            console.error(error)
        }
       
    }

    const getMarca = async (id) => {
        try {
            const response = await getMarcaRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
       
    }

    const deleteMarca = async (id) => {
        try {
            const response = await deleteMarcaRequest(id)
            setMarcas(marcas.filter(marcas => marcas.idMarca !== id))
        } catch (error) {
            console.error(error)
        }
    }
    const createMarca = async (values) => {
        try {
            const response = await createMarcaRequest(values)
            console.log(response)
            
        } catch (error) {
            console.error(error)
        }
    }

    const updateMarca = async (id, values) => {
        try {
            const response = await updateMarcaRequest(id, values)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MarcaContext.Provider value={{ marcas, loadMarcas, getMarca, deleteMarca, createMarca, updateMarca }}>
            {children}
        </MarcaContext.Provider>
    )
}