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
    // const [yearElegido, setYearElegido] = useState("")
    //  const [mesElegido, setMesElegido] = useState("")

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
                    //console.log(values)

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
                        <input pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" className='inpNombre' type="email" name='correo' placeholder='Escriba su Correo electrónico'
                            onChange={handleChange} value={values.correo} autoComplete="email" />

                        <label>Contraseña</label>
                        <div className='contrainerContra'>
                            <input pattern="[A-Za-z0-9]{6,15}" className='inpContra' id='inpIdContra' type="text" name='userPassword' placeholder='Escriba su Contraseña'
                                onChange={handleChange} value={values.userPassword} autoComplete='new-password' />
                            <img src={ojo} alt="mostrar u ocultar contraseña" className='icon' id='eye' onClick={mostarContra} />
                        </div>

                        <label>Nombre</label>
                        <input pattern="[A-Za-z]{1,15}" className='inpNombre' type="text" name='nombre' placeholder='Escriba su Nombre'
                            onChange={handleChange} value={values.nombre} />
                        <label>Apellido</label>
                        <input pattern="[A-Za-z]{1,15}" className='inpNombre' type="text" name='apellido' placeholder='Escriba su Apellido'
                            onChange={handleChange} value={values.apellido} />

                        <label>Fecha de Nacimiento</label>

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


                                if (date >= new Date()) {
                                    alert("La fecha ingresada no es válida")
                                }
                                values.fechaNacimiento = date.toISOString().substring(0, 10)
                                setDate(date)
                            }}

                        />
                        <label>Teléfono</label>
                        <input pattern="[0-9]{1,30}" className='inpNombre' type="tel" name='telefono' placeholder='Escriba su Teléfono'
                            onChange={handleChange} value={values.telefono} />
                        <label>Direccion</label>
                        <input pattern="[A-Za-z]{1,50}" className='inpNombre' type="text" name='direccion' placeholder='Escriba su Dirección'
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