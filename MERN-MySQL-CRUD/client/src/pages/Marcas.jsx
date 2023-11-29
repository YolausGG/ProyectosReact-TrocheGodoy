import React, { useEffect } from 'react'
import Marca from '../components/Marca.jsx'
import { useMarcas } from '../contexts/marcas.jsx'
import '../styles/categoria.css'

function Marcas() {

    const { marcas, loadMarcas } = useMarcas()

    useEffect(() => {
        loadMarcas()
    }, [])

    return (
        <div className='listCategorias'>
            <h2>Lista de Marcas</h2>
            {
                marcas.map(marca => (
                    <Marca key={marca.idMarca} marca={marca} />
                ))
            }
        </div>
    )
}

export default Marcas