import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { createUsuarioRequest } from '../api/usuarios.api';
//npm install react-datepicker --save
import "react-datepicker/dist/react-datepicker.css";

import '../styles/createUsuario.css'
import '../styles/forms.css'


import { inputsInteractivos, mostarContra, fechasInteractivos } from "../hooks/forms.js"

function CreateUsuario() {
    useEffect(() => {
        inputsInteractivos()
        mostarContra()
        fechasInteractivos()
    }, [])
    const navigate = useNavigate()

    const [usuario] = useState({
        correo: "",
        nombre: "",
        userPassword: "",
        apellido: "",
        fechaNacimiento: { dia: "", mes: "", year: "" },
        telefono: "",
        direccion: ""
    })

    const months = [
        { mes: "Enero", value: "01" },
        { mes: "Febrero", value: "02" },
        { mes: "Marzo", value: "03" },
        { mes: "Abril", value: "04" },
        { mes: "Mayo", value: "05" },
        { mes: "Junio", value: "06" },
        { mes: "Julio", value: "07" },
        { mes: "Agosto", value: "08" },
        { mes: "Setiembre", value: "09" },
        { mes: "Octubre", value: "10" },
        { mes: "Noviembre", value: "11" },
        { mes: "Diciembre", value: "12" }
    ];

    return (
        <div className='createUsuarioContainer formContainer'>
            <h2>Crear Usuario</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {

                    const fechaHoy = new Date()

                    console.log(values.fechaNacimiento);
                    console.log(parseInt(values.fechaNacimiento.mes));
                    console.log(fechaHoy);

                    if (values.fechaNacimiento.mes == '' || values.fechaNacimiento.mes == '-1') {
                        alert("Seleccione un Mes")
                    } 
                    else if (values.fechaNacimiento.year > fechaHoy.getFullYear()
                        || values.fechaNacimiento.dia > 31
                        || values.fechaNacimiento.dia == fechaHoy.getDate() && values.fechaNacimiento.mes == fechaHoy.getMonth() && values.fechaNacimiento.year == fechaHoy.getFullYear()) {
                        alert("La fecha ingresada no es válida")
                    }
                    else {
                        var txtFechaSeleccionada = values.fechaNacimiento.year + "-" +
                            values.fechaNacimiento.mes + "-" +
                            values.fechaNacimiento.dia
                        console.log(txtFechaSeleccionada);

                        const fechaSeleccionada = new Date(txtFechaSeleccionada)
                        console.log(fechaSeleccionada);

                        if (fechaSeleccionada > fechaHoy) {
                            alert("La fecha es ingresada es mayor a la de hoy")
                        } else {

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

                    }
                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formUsuario' onSubmit={handleSubmit}>

                        <div className='divSimpleInp'>
                            <label>
                                <span>Correo Electrónico</span>
                                <input required pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" type="email" name='correo'
                                    onChange={handleChange} value={values.correo} autoComplete="email" />
                            </label>
                        </div>
                        <div className='contrainerContra divSimpleInp'>
                            <label>
                                <span>Contraseña</span>
                                <input required pattern="[A-Za-z0-9]{6,15}" id='inpIdContra' type="text" name='userPassword'
                                    onChange={handleChange} value={values.userPassword} autoComplete='new-password' />
                                <img alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                            </label>
                        </div>

                        <div className='divSimpleInp'>
                            <label>
                                <span>Nombre</span>
                                <input required pattern="[A-Za-z]{1,15}" type="text" name='nombre'
                                    onChange={handleChange} value={values.nombre} />
                            </label>
                        </div>
                        <div className='divSimpleInp'>
                            <label>
                                <span>Apellido</span>
                                <input required pattern="[A-Za-z]{1,15}" type="text" name='apellido'
                                    onChange={handleChange} value={values.apellido} />
                            </label>
                        </div>
                        <div className='containerFN'>
                            <div className='divSimpleInp'>
                                <label>
                                    <span>Día</span>
                                    <input required maxLength={2} type="text" name='fechaNacimiento.dia'
                                        onChange={handleChange} value={values.fechaNacimiento.dia} />
                                </label>
                            </div>
                            <div className='containerMesFN'>
                                <label className='labelMesFN'>
                                    <span id='idSpanMesFN' className='spanMesFN'>Mes</span>
                                    <select id='selectMes' className='divSimpleInp sectionMes' name='fechaNacimiento.mes'
                                        onChange={handleChange} value={values.fechaNacimiento.mes}
                                    >
                                        <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                        {months.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.mes}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='divSimpleInp'>
                                <label>
                                    <span>Año</span>
                                    <input required maxLength={4} type="text" name='fechaNacimiento.year'
                                        onChange={handleChange} value={values.fechaNacimiento.year} />
                                </label>
                            </div>

                        </div>
                        <div className='divSimpleInp'>
                            <label>
                                <span>Teléfono</span>
                                <input required pattern="[0-9]{1,30}" type="tel" name='telefono'
                                    onChange={handleChange} value={values.telefono} />
                            </label>
                        </div>
                        <div className='divSimpleInp'>
                            <label>
                                <span>Dirección</span>
                                <input required pattern="[A-Za-z0-9 ]{1,50}" type="text" name='direccion'
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