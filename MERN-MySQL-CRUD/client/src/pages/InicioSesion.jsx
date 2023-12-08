import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom";

import ojo from '../images/ojo.png'
import invisible from '../images/invisible.png'
import { useState } from "react"
import { getSesionUsuarioRequest } from "../api/usuarios.api";

function mostarContra() {

    var inp = document.getElementById('inpIdContra')
    var eye = document.getElementById('eye')

    if (inp.type == "password") {
        inp.type = "text"
        eye.src = invisible
    } else {
        inp.type = "password"
        //inp.value = "hidden"
        eye.src = ojo
    }

}
function InicioSesion() {

    const [usuario, setUsuario] = useState({
        correo: "",
        userPassword: ""
    })

    const navigate = useNavigate()

    return (
        <div className='createCategoriaContainer'>
            <h2>Iniciar Sesión</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {

                    //console.log(values)

                    const respuesta = await getSesionUsuarioRequest(values)

                    //console.log(respuesta);
                    if (respuesta.data) {
                        navigate('/usuarios')

                        actions.resetForm({
                            values: {
                                correo: "",
                                userPassword: ""
                            },
                        })
                    } else {
                        var lblError = document.getElementById('lblMensajeError')
                        lblError.innerText = "Usuario no registrado"
                        lblError.style.display = 'block'
                    }

                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formCategoria' onSubmit={handleSubmit}>
                        <label>Correo</label>
                        <input className='inpNombre' type="text" name="correo" placeholder="Ingrese su correo electrónico"
                            onChange={handleChange} value={values.correo} autoComplete="email" />

                        <label>Contraseña</label>
                        <div className='contrainerContra'>
                            <input className='inpContra' id='inpIdContra' type="text" name='userPassword' placeholder='Escriba su Contraseña'
                                onChange={handleChange} value={values.userPassword} autoComplete='new-password' minLength={6} />
                            <img src={ojo} alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                        </div>
                        <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Chequeando..." : "Iniciar Sesion"}
                        </button>
                        
                        <Link id="lblCrearCuenta" to="/createUsuario">Crear una Cuenta</Link>
                        <Link id="lblCrearCuenta" to="/inicioSesion">¿Olvidaste la contraseña?</Link>

                        <label id="lblMensajeError" ></label>
                    </Form>
                )}

            </Formik>
        </div>

    )
}

export default InicioSesion