import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useCategorias } from '../contexts/categorias.jsx'
import { useNavigate, useParams } from "react-router-dom";

function CreateCategoria() {

    const { createCategoria, getCategoria, updateCategoria } = useCategorias();
    
    const navigate = useNavigate()

    const [categoria, setCategoria] = useState({
        nombre: ""
    })

    const params = useParams()
    console.log(params)

    useEffect(() => {
        const loadCategoria = async () => {
            const categoria = await getCategoria(params.id)
            setCategoria({
                nombre: categoria.nombre
            })
        }
        if (params.id !== undefined)
            loadCategoria()
        else{
            setCategoria({
                nombre: ""
            })
        }
    }, [])

    return (
        <div className='createCategoriaContainer'>
            <h2>{params.id ? 'Editar Categoria' : 'Crear Categoria'}</h2>

            <Formik 
                initialValues={categoria}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    console.log(values)

                    if (params.id) {
                        await updateCategoria(params.id, values)
                        navigate('/categorias')
                        actions.resetForm({
                            values: {
                                nombre: ""
                            },
                        })
                    } else {
                        await createCategoria(values)
                        actions.resetForm({
                            values: {
                                nombre: ""
                            },
                        })
                    }                    
                    setCategoria({
                        nombre: ""
                    })
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form className='formCategoria' onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input className='inpNombre' type="text" name='nombre' required placeholder='Escriba el Nombre de la Categoria'
                            onChange={handleChange} value={values.nombre} />

                        <button className={`bontonCategoria ${params.id ? 'btnUpdate' : 'btnCreate'}`} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : `${params.id ? "Actualizar" : "Crear"}`}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCategoria