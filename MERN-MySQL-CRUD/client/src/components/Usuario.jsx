import PropTypes from 'prop-types'

function Usuario({ usuario }) {

    const fechaNac = usuario.fechaNacimiento.substring(0, 10)

    var nombreArray = fechaNac.split('-')
    var fechaFinal = ""

    for (let index = nombreArray.length - 1; index >= 0; index--) {
        
        if (index == nombreArray.length - 1)
            fechaFinal = nombreArray[index];
        else {
            fechaFinal += "-" + nombreArray[index];
        }

    }

    return (
        <li>
            <h3>{usuario.nombre} {usuario.apellido}</h3>            
            <p>{usuario.correo}</p>
            <p>{usuario.userPassword}</p>
            <p>{fechaFinal}</p>
            <p>{usuario.telefono}</p>
            <p>{usuario.direccion}</p>
        </li>
    )
}

export default Usuario

Usuario.propTypes = {
    usuario: PropTypes.object.isRequired,
    fechaNacimiento: PropTypes.string,
    nombre: PropTypes.string,
    telefono: PropTypes.string,
    direccion: PropTypes.string
}
