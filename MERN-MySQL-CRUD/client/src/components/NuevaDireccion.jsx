import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { createDireccionRequest } from '../api/direccion.api.js'

import '../styles/createUsuario.css'
import '../styles/forms.css'

import { inputsInteractivos, marcaYCategoriaInteractivas } from "../hooks/forms.js"
import { useProductos } from '../contexts/productos.jsx'


function NuevaDireccion() {

    const { idUsuarioLogeado } = useProductos()

    useEffect(() => {
        inputsInteractivos()
        marcaYCategoriaInteractivas()

    }, [])

    const [direccion] = useState({
        idUsuario: idUsuarioLogeado,
        calle: "",
        departamento: "",
        ciudad: "",
        numeroDeCasa: "",
        numeroDeApartamento: "",
        referencia: "",
        codigoPostal: "",
    })

    const departamentos = [
        { departamento: "Artigas", value: "01" },
        { departamento: "Canelones", value: "02" },
        { departamento: "Cerro Largo", value: "03" },
        { departamento: "Colonia", value: "04" },
        { departamento: "Durazno", value: "05" },
        { departamento: "Flores", value: "06" },
        { departamento: "Flordia", value: "07" },
        { departamento: "Lavalleja", value: "08" },
        { departamento: "Maldonado", value: "09" },
        { departamento: "Montevideo", value: "10" },
        { departamento: "Paysandú", value: "11" },
        { departamento: "Rio Negro", value: "12" },
        { departamento: "Rivera", value: "13" },
        { departamento: "Rocha", value: "14" },
        { departamento: "Salto", value: "15" },
        { departamento: "San José", value: "16" },
        { departamento: "Soriano", value: "17" },
        { departamento: "Tacuarembó", value: "18" },
        { departamento: "Treinta y Tres", value: "19" }
    ];

    return (
        <div className='createDireccionContainer'>
            <h2>Nueva Dirección Usuario</h2>
            <Formik
                initialValues={direccion}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {

                    const respuesta = await createDireccionRequest(values)
                    console.log(respuesta);
                    if (respuesta.status == 200) {
                        console.log(direccion);
                        actions.resetForm({
                            values: {
                                idUsuario: "",
                                calle: "",
                                departamento: "",
                                ciudad: "",
                                numeroDeCasa: "",
                                numeroDeApartamento: "",
                                referencia: "",
                                codigoPostal: ""
                            },
                        })
                        console.log('Dirección ingresada con Éxito');

                    }
                    else
                        console.log('La Dirección no se pudo ingresar');

                }
                }>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formUsuario' onSubmit={handleSubmit}>


                        <div className='divSimpleInp'>
                            <label>
                                <span>Calle</span>
                                <input required pattern="[A-Za-z]{1,30}" type="text" name='calle'
                                    onChange={handleChange} value={values.calle} />
                            </label>
                        </div>
                        <div className='containerMC'>
                            <label className='labelMC'>
                                <span className='spanMC' >Departamentos</span>
                                <select required id='selectDepartamento' className='divSimpleInp selectMC' name='departamento'
                                    onChange={handleChange} value={values.departamento}
                                >
                                    <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                    {departamentos.map((option) => (
                                        <option key={option.value} value={option.departamento}>
                                            {option.departamento}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className='divSimpleInp'>
                            <label>
                                <span>Ciudad</span>
                                <input required pattern="[A-Za-z]{1,30}" type="text" name='ciudad'
                                    onChange={handleChange} value={values.ciudad} />
                            </label>
                        </div>

                        <div className='divSimpleInp'>
                            <label>
                                <span>Número de Casa</span>
                                <input pattern="[0-9]{5}" min={1} type="number" name='numeroDeCasa'
                                    onChange={handleChange} value={values.numeroDeCasa} />
                            </label>
                        </div>

                        <div className='divSimpleInp'>
                            <label>
                                <span>Número de Apartamento</span>
                                <input pattern="[0-9]{5}" min={1} type="number" name='numeroDeApartamento'
                                    onChange={handleChange} value={values.numeroDeApartamento} />
                            </label>
                        </div>

                        <div className='divSimpleInp'>
                            <label>
                                <span>Referencia</span>
                                <input pattern="[A-Z a-z]{1,50}" type="text" name='referencia'
                                    onChange={handleChange} value={values.referencia} />
                            </label>
                        </div>


                        <div className='divSimpleInp'>
                            <label>
                                <span>Codigo Postal</span>
                                <input required maxLength={5} pattern="[0-9]" type="text" name='codigoPostal'
                                    onChange={handleChange} value={values.codigoPostal} />
                            </label>
                        </div>

                        <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : "Ingresar"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default NuevaDireccion