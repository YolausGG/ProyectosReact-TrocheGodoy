import { Form, Formik } from "formik"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { getSesionUsuarioRequest, updatePasswordRequest, sendEmails } from "../api/usuarios.api";

import '../styles/verificarCuenta.css';

import { inputsInteractivos } from "../hooks/forms.js"
import { Resend } from 'resend';




function VerificarCuenta() {

    useEffect(() => {
        inputsInteractivos()
    }, [])

    const [usuario, setUsuario] = useState({
        correo: ""
    })

    const [mensaje, setMensaje] = useState()


    function autoPassword() {
        var caracteres = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var password = '';
        for (var i = 0; i <= 8; i++) {
            password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

        return password;
    }

    return (
        <div className='createCategoriaContainer'>
            <h2>Verifica tu Cuenta</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {


                    const respuesta = await getSesionUsuarioRequest(values)
                    console.log(respuesta)

                    var lblError = document.getElementById('lblMensajeErrorInicioSesion')
                    lblError.style.color = 'red'

                    actions.resetForm({
                        values: {
                            correo: ""
                        },
                    })

                    if (respuesta.data == 2) {


                        var password = autoPassword();
                        console.log(password);

                        const updatePassword = await updatePasswordRequest(1, { password: password })
                        console.log(updatePassword)

                        if (updatePassword.status == 204) {

                            const resend = new Resend('re_SgYDSGnu_LbuXcuUq2zzhigxXKqYTNoeL');

                            (async function () {
                                const { data, error } = await resend.emails.send({
                                    from: 'Acme <onboarding@resend.dev>',
                                    to: ['delivered@resend.dev'],
                                    subject: 'Hello World',
                                    html: '<strong>It works!</strong>',
                                });

                                if (error) {
                                    return console.error({ error });
                                }

                                console.log({ data });
                            })();

                        }
                    }
                    else {
                        setMensaje("Correo no registrado")
                    }

                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formVerificarCuenta' onSubmit={handleSubmit}>

                        <div className="divSimpleInp">
                            <label>
                                <span>Correo </span>
                                <input className='inpCorreo' pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" type="email" name="correo"
                                    onChange={handleChange} value={values.correo} autoComplete="email" />
                            </label>
                        </div>

                        <label id="lblMensajeErrorInicioSesion">{mensaje}</label>

                        <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Chequeando..." : "Enviar Nueva Contraseña"}
                        </button>

                        <Link id="lblCrearCuenta" to="/inicioSesion">Inicio Sesion</Link>

                    </Form>
                )}

            </Formik>
        </div >

    )
}

export default VerificarCuenta