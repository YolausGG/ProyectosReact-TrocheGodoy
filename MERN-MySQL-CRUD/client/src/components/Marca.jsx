import { useMarcas } from '../contexts/marcas.jsx'
import { useNavigate } from "react-router-dom";

function Marca({ marca }) {

    const navigate = useNavigate()

    const { deleteMarca } = useMarcas()
    return (
        <div className='categoriaContainer'>
            <h3>{marca.nombre}</h3>
            <div className='botonesContainer'>
                <button className="bontonCategoria btnUpdate" onClick={() => navigate(`/updateMarca/${marca.idMarca}`)}>Actualizar</button>
                <button className="bontonCategoria btnEliminar" onClick={() => deleteMarca(marca.idMarca)}>Borrar</button>
            </div>
        </div>
    )
}

export default Marca