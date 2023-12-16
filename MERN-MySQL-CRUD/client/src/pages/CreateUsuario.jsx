import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { createUsuarioRequest } from '../api/usuarios.api';
//npm install react-datepicker --save
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/CreateUsuario.css'

import { inputsInteractivos, mostarContra } from "../hooks/forms.js"

function rango(principio, final) {
    let anios = []
    for (let index = principio; index < final; index++) {
        anios.push(index)
    }
    return anios
}

function CreateUsuario() {
    useEffect(() => {
        inputsInteractivos()
        mostarContra()
    }, [])
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState({
        correo: "",
        nombre: "",
        userPassword: "",
        apellido: "",
        fechaNacimiento: new Date(),
        telefono: "",
        direccion: ""
    })

    const [years, setYears] = useState(() => {
        return rango(1940, new Date().getFullYear() + 1)
    })

    const [date, setDate] = useState(new Date());

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    return (
        <div className='createUsuarioContainer'>
            <h2>Crear Usuario</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    const fechaHoy = new Date()

                    if (values.fechaNacimiento > fechaHoy || date.getDate() == fechaHoy.getDate() && date.getMonth() == fechaHoy.getMonth() && date.getFullYear() == fechaHoy.getFullYear()) {
                        alert("La fecha ingresada no es válida")
                    } else {
                        var fechaFinal = date.getFullYear() + "-" + (date.getMonth() + 1)

                        if (date.getDate().toString().length > 1) {
                            fechaFinal += "-" + date.getDate()
                        } else {
                            fechaFinal += "-0" + date.getDate()
                        }
                        values.fechaNacimiento = fechaFinal

                        console.log(values.fechaNacimiento);
                        const respuesta = await createUsuarioRequest(values)
                        console.log(respuesta);
                        if (respuesta)
                            navigate('/usuarios')

                        actions.resetForm({
                            values: {
                                nombre: ""
                            },
                        })
                    }
                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formUsuario' onSubmit={handleSubmit}>

                        <div>
                            <label>
                                <span>Correo Electrónico</span>
                                <input required pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" className='inpSimple' type="email" name='correo'
                                    onChange={handleChange} value={values.correo} autoComplete="email" />
                            </label>
                        </div>
                        <div className='contrainerContra'>
                            <label>
                                <span>Contraseña</span>
                                <input required pattern="[A-Za-z0-9]{6,15}" className='inpSimple' id='inpIdContra' type="text" name='userPassword'
                                    onChange={handleChange} value={values.userPassword} autoComplete='new-password' />
                                <img alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                            </label>
                        </div>

                        <div>
                            <label>
                                <span>Nombre</span>
                                <input required pattern="[A-Za-z]{1,15}" className='inpSimple' type="text" name='nombre'
                                    onChange={handleChange} value={values.nombre} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Apellido</span>
                                <input required pattern="[A-Za-z]{1,15}" className='inpSimple' type="text" name='apellido'
                                    onChange={handleChange} value={values.apellido} />
                            </label>
                        </div>
                        <div>
                            <label className=''> 
                                <span className='top'>Fecha de Nacimiento</span>
                                <DatePicker className='datePickerFN' type="date" name='fechaNacimiento' dateFormat='dd/MM/yyyy'
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                    }) => (
                                        <div
                                            style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "3px",
                                            }}
                                        >

                                            <select
                                                value={date.getFullYear()}
                                                onChange={({ target: { value } }) => {
                                                    changeYear(value)
                                                }}
                                            >
                                                {years.map((option) => (

                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                value={months[date.getMonth()]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                            >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    selected={date}
                                    onChange={(date) => {

                                        values.fechaNacimiento = date
                                        console.log(date);
                                        setDate(date)
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Teléfono</span>
                                <input required pattern="[0-9]{1,30}" className='inpSimple' type="tel" name='telefono'
                                    onChange={handleChange} value={values.telefono} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Dirección</span>
                                <input required pattern="[A-Za-z0-9]{1,50}" className='inpSimple' type="text" name='direccion'
                                    onChange={handleChange} value={values.direccion} />
                            </label>
                        </div>

                        <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : "Crear"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default CreateUsuario