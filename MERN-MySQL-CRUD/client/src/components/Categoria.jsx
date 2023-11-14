import { useCategorias } from '../contexts/categorias.jsx'
import { useNavigate } from "react-router-dom";

function Categoria({ categoria }) {

    const navigate = useNavigate()

    const { deleteCategoria } = useCategorias()
    return (
        <div className='categoriaContainer'>
            <h3>{categoria.nombre}</h3>
            <div className='botonesContainer'>
                <button className="bontonCategoria btnUpdate" onClick={() => navigate(`/updateCategoria/${categoria.idCategoria}`)}>Actualizar</button>
                <button className="bontonCategoria btnEliminar" onClick={() => deleteCategoria(categoria.idCategoria)}>Borrar</button>
            </div>
        </div>
    )
}

export default Categoria