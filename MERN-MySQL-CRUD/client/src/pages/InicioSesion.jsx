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

    const [intentos, setIntentos] = useState(0)
    const [mensaje, setMensaje] = useState()
    const navigate = useNavigate()

    return (
        <div className='createCategoriaContainer'>
            <h2>Iniciar Sesión</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {

                    const respuesta = await getSesionUsuarioRequest(values)
                    console.log('respuesta');
                    console.log(respuesta);
                    if (respuesta.data == 1) {
                        navigate('/usuarios')

                        actions.resetForm({
                            values: {
                                correo: "",
                                userPassword: ""
                            },
                        })
                    } else {
                        var lblError = document.getElementById('lblMensajeErrorInicioSesion')
                        lblError.style.color = 'red'

                        if (respuesta.data == 2) {
                            console.log(intentos);
                            setIntentos(intentos+1)
                            
                            if (values.correo != usuario.correo) {
                                setIntentos(0)
                                setUsuario({ correo: values.correo, userPassword: values.userPassword })
                            } else

                            if (intentos < 3)
                                setMensaje("Contraseña Incorrecta")
                            else
                                setMensaje(<Link id="linkOlvidastePassword" to="/inicioSesion">¿Olvidaste la contraseña?</Link>)
                        }
                        else {
                            setMensaje("Correo no registrado")
                        }
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
                        <label id="lblMensajeErrorInicioSesion">{mensaje}</label>

                        <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Chequeando..." : "Iniciar Sesion"}
                        </button>

                        <Link id="lblCrearCuenta" to="/createUsuario">Crear una Cuenta</Link>
                        <Link id="lblCrearCuenta" to="/inicioSesion">¿Olvidaste la contraseña?</Link>

                    </Form>
                )}

            </Formik>
        </div>

    )
}

export default InicioSesion