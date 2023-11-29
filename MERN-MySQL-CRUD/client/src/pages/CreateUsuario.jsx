import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { createUsuarioRequest } from '../api/usuarios.api';
//npm install react-datepicker --save
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/CreateUsuario.css'

import ojo from '../images/ojo.png'
import invisible from '../images/invisible.png'


function rango(principio, final) {

    let anios = []

    for (let index = principio; index < final; index++) {
        anios.push(index)
    }
    return anios
}

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



function CreateUsuario() {

    const [usuario, setUsuario] = useState({
        correo: "",
        nombre: "",
        userPassword: "",
        apellido: "",
        fechaNacimiento: new Date(),
        telefono: "",
        direccion: ""
    })

    const navigate = useNavigate()

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

        <div className='createCategoriaContainer'>
            <h2>Crear Usuario</h2>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    console.log(values)

                    values.fechaNacimiento = values.fechaNacimiento.toISOString().substring(0, 10)
                    console.log(values)

                    const respuesta = await createUsuarioRequest(values)
                    console.log(respuesta);
                    if (respuesta)
                        navigate('/usuarios')

                    actions.resetForm({
                        values: {
                            nombre: ""
                        },
                    })
                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formCategoria' onSubmit={handleSubmit}>
                        <label>Correo Electrónico</label>
                        <input className='inpNombre' type="mail" name='correo' placeholder='Escriba su Correo electrónico'
                            onChange={handleChange} value={values.correo} autoComplete="email" />

                        <label>Contraseña</label>
                        <div className='contrainerContra'>
                            <input className='inpContra' id='inpIdContra' type="text" name='userPassword' placeholder='Escriba su Contraseña'
                                onChange={handleChange} value={values.userPassword} autoComplete='new-password' minLength={6} />
                            <img src={ojo} alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                        </div>

                        <label>Nombre</label>
                        <input className='inpNombre' type="text" name='nombre' placeholder='Escriba su Nombre'
                            onChange={handleChange} value={values.nombre} />
                        <label>Apellido</label>
                        <input className='inpNombre' type="text" name='apellido' placeholder='Escriba su Apellido'
                            onChange={handleChange} value={values.apellido} />
                        <label>Fecha de Nacimiento</label>
                        {console.log(values)}

                        <DatePicker className='datePickerFN' type="date" name='fechaNacimiento' dateFormat='dd/MM/yyyy'
                            renderCustomHeader={({
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,

                            }) => (
                                <div
                                    style={{
                                        margin: 10,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                    </button>
                                    <select
                                        onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <select
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

                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                    </button>
                                </div>
                            )}
                            selected={date}
                            onChange={(date) => {
                                values.fechaNacimiento = date
                                setDate(date)
                            }}

                        />
                        <label>Teléfono</label>
                        <input className='inpNombre' type="tel" name='telefono' placeholder='Escriba su Teléfono'
                            onChange={handleChange} value={values.telefono} />
                        <label>Direccion</label>
                        <input className='inpNombre' type="text" name='direccion' placeholder='Escriba su Direccion'
                            onChange={handleChange} value={values.direccion} />

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