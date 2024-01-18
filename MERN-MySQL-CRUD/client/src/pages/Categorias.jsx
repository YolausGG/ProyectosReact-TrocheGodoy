import Categoria from '../components/Categoria.jsx'
import { useCategorias } from '../contexts/categorias.jsx'
import '../styles/categoria.css'

function Categorias() {

    const { categorias } = useCategorias()

    return (
        
        <div className='listCategorias'>
            <h2>Lista de Categorias</h2>
            {
                categorias.map(categoria => (
                    <Categoria key={categoria.idCategoria} categoria={categoria} />
                ))
            }
        </div>
    )
}

export default Categorias