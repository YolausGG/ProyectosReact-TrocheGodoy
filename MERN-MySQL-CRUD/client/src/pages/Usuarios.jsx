import { useEffect, useState } from 'react'
import Usuario from '../components/Usuario.jsx'
import { getUsuariosRequest } from '../api/usuarios.api.js'

function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
   
    useEffect(() => {
        const loadUsaurios = async () => {
            try {
                const response = await getUsuariosRequest()
                console.log(response);
                setUsuarios(response.data.result)
            } catch (error) {
                console.error(error)
            }
    
        }
        loadUsaurios()
    }, [])

    return (
        <div>
            <ul>
                {usuarios.map(usuario => (
                    <Usuario key={usuario.idUsuario} usuario={usuario} />
                ))
                }
            </ul>
        </div>
    )
}

export default Usuarios