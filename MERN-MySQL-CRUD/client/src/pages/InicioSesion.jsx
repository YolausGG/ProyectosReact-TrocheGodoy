import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react"
import { getSesionUsuarioRequest } from "../api/usuarios.api";

import '../styles/inicioSesion.css';

import { inputsInteractivos, mostarContra } from "../hooks/forms.js"


function InicioSesion() {

    useEffect(() => {
        inputsInteractivos()
        mostarContra()
    }, [])

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
                    <Form className='formInicioSesion' onSubmit={handleSubmit}>
                                                
                        <div className="divSimpleInp">
                            <label>
                                <span>Correo</span>
                                <input className='inpCorreo' pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" type="email" name="correo"
                                    onChange={handleChange} value={values.correo} autoComplete="email" />
                            </label>
                        </div>

                        <div className='contrainerContra divSimpleInp'>
                            <label>
                                <span>Contraseña</span>
                                <input className='inpContra' id='inpIdContra' pattern="[A-Za-z0-9]{6,15}" type="text" name='userPassword'
                                    onChange={handleChange} value={values.userPassword} autoComplete='new-password' minLength={6} />
                                <img alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                            </label>
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