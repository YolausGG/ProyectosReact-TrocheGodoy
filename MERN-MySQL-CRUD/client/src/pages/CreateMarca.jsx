import{ useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useMarcas } from '../contexts/marcas.jsx'
import { useNavigate, useParams } from "react-router-dom";


function CreateMarca() {

    const { createMarca, getMarca, updateMarca } = useMarcas();
    
    const navigate = useNavigate()

    const [marca, setMarca] = useState({
        nombre: ""
    })

    const params = useParams()
    console.log(params)

    useEffect(() => {
        const loadMarca = async () => {
            const marca = await getMarca(params.id)
            setMarca({
                nombre: marca.nombre
            })
        }
        if (params.id !== undefined)
            loadMarca()
        else{
            setMarca({
                nombre: ""
            })
        }
        
    }, [])

    return (
        <div className='createCategoriaContainer'>
            <h2>{params.id ? 'Editar Marca' : 'Crear Marca'}</h2>

            <Formik
                initialValues={marca}
                enableReinitialize={true}
                onSubmit={async (values,actions) => {
                    console.log(values)

                    if (params.id) {
                        await updateMarca(params.id, values)
                        navigate('/marcas')
                        actions.resetForm({
                            values: {
                                nombre: ""
                            },
                        })
                    } else {
                        await createMarca(values)
                        actions.resetForm({
                            values: {
                                nombre: ""
                            },
                        })
                    }
                    setMarca({
                        nombre: ""
                    })
                    
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formCategoria' onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input className='inpNombre' type="text" name='nombre' placeholder='Escriba el Nombre de la Marca'
                            onChange={handleChange} value={values.nombre}/>
                           

                        <button className={`bontonCategoria ${params.id ? 'btnUpdate' : 'btnCreate'}`} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : `${params.id ? "Actualizar" : "Crear"}`}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateMarca  