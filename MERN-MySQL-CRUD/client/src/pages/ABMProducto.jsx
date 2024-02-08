import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { createProductoRequest, deleteProductoRequest, updateProductoRequest } from '../api/productos.api.js'
import { useProductos } from '../contexts/productos.jsx'

import { inputsInteractivos } from "../hooks/forms.js"
import { useNavigate } from 'react-router-dom'
import { createAccesorioRequest, createCalzadoRequest, createVestimentaRequest } from '../api/tipoProducto.api.js'
//import { cargarImagen } from '../hooks/imagen.jsx'

export default function ABMProducto() {

    const { productos, imagenesActivas, cargarImagenes } = useProductos()

    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        talle: "",
        stock: "",
        descripcion: "",
        tipoProducto: "",
        imagenes: []
    })
    

    useEffect(() => {        
        inputsInteractivos()
        cargarFuncionalidadImagen()
        console.log(imagenesActivas);
    },[])

    const [chkbs, setChks] = useState([
        { id: 1, isChecked: true, name: 'Calzado' },
        { id: 2, isChecked: false, name: 'Vestimenta' },
        { id: 3, isChecked: false, name: 'Accesorio' },
    ]);

    function onChangeCheckBoxs(id) {
        setChks(chkbs.map(chkb => {
            if (chkb.id === id) { producto.tipoProducto = chkb.name; return { ...chkb, isChecked: true } }
            else return { ...chkb, isChecked: false };
        }))
    }

    function cargarFuncionalidadImagen() {

        //const { createImagen } = useImagen();        
        let files;

        const areaImagen = document.querySelector("#drag-area");

        const dragText = areaImagen.querySelector("#h4-img");
        const button = areaImagen.querySelector("#button-img");
        const input = areaImagen.querySelector("#inp-file");

        button.addEventListener("click", () => {
            input.click();
        })

        input.addEventListener('change', () => {
            files = input.files
            areaImagen.classList.add('active')
            console.log('change');
            showFiles(files)
            areaImagen.classList.remove('active')
        })

        areaImagen.addEventListener('dragover', (e) => {
            e.preventDefault()
            areaImagen.classList.add('active')
            dragText.textContent = 'Suelta para subir la Imagenes'
        })
        areaImagen.addEventListener('dragleave', (e) => {
            e.preventDefault()
            areaImagen.classList.remove('active')
            dragText.textContent = 'Arrastra y suelta Imagenes'
        })
        areaImagen.addEventListener('drop', (e) => {
            e.preventDefault()
            files = e.dataTransfer.files
            console.log('drop');
            showFiles(files)
            areaImagen.classList.remove('active')
            dragText.textContent = 'Arrastra y suelta Imagenes'
        })
    }

    function showFiles(files) {
        console.log(files);
        for (const file of files) {
            processFile(file)
        }

    }

    function processFile(file) {

        const docType = file.type;
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']

        const fileReader = new FileReader()
        const id = `file-${Math.random().toString(32).substring(7)}`


        if (validExtensions.includes(docType)) {
            fileReader.addEventListener('load', () => {
                const fileUrl = fileReader.result
                const image = `
                    <div id="${id}" className="file-container">
                        <img src="${fileUrl}" alt="${file.name}" width="50px">
                        <div className="img-status">
                            <span>${file.name}</span>
                            <span className='status-text'>
                                Loading...
                            </span>
                        </div>
                    </div>
                    `
                const htmlImage = document.querySelector('#imgs-preview').innerHTML
                document.querySelector('#imgs-preview').innerHTML = image + htmlImage

            })
            
            const formData = new FormData()
            formData.append("file", file)
            
            fileReader.readAsDataURL(file)

            cargarImagenes(file)

        } else {
            alert('No es un archivo valido')
        }
    }

    return (
        <>
            <div className='container-forms'>
                <div className='createProductoContainer formContainer'>
                    <h2>Crear Producto</h2>
                    <Formik
                        initialValues={producto}
                        enableReinitialize={true}
                        onSubmit={async (values, actions) => {

                            console.log(producto);
                            values.tipoProducto = producto.tipoProducto

                            const respuestaP = await createProductoRequest(values)

                            console.log(values);
                            console.log(respuestaP);
                            if (respuestaP.status == 200) {
                                

                                if (producto.tipoProducto == 'Calzado') {

                                    const respuestaC = await createCalzadoRequest(respuestaP.data.idProducto)
                                    console.log(respuestaC);
                                    if (respuestaC.status == 200) {
                                        console.log(producto);
                                        actions.resetForm({
                                            values: {
                                                nombre: "",
                                                precio: "",
                                                talle: "",
                                                stock: "",
                                                descripcion: "",
                                                tipoProducto: "",
                                                tipo: "",
                                                imagenes: []
                                            },
                                        })
                                        console.log('Calzado ingresado con Éxito');
                                    }
                                    else
                                        console.log('Calzado no ingresado');
                                }
                                if (producto.tipoProducto == 'Vestimenta') {
                                    const respuestaV = await createVestimentaRequest(respuestaP.data.idProducto)
                                    console.log(respuestaV);
                                    if (respuestaV.status == 200) {
                                        console.log(producto);
                                        actions.resetForm({
                                            values: {
                                                nombre: "",
                                                precio: "",
                                                talle: "",
                                                stock: "",
                                                descripcion: "",
                                                tipoProducto: "",
                                                tipo: "",
                                                imagenes: []
                                            },
                                        })
                                        console.log('Vestimenta ingresada con Éxito');
                                    }
                                    else
                                        console.log('Vestimenta no ingresada');
                                }
                                if (producto.tipoProducto == 'Accesorio') {

                                    const respuestaA = await createAccesorioRequest(respuestaP.data.idProducto)
                                    console.log(respuestaA);
                                    if (respuestaA.status == 200) {
                                        console.log('Accesorio ingresado con Éxito');
                                        console.log(producto);

                                        actions.resetForm({
                                            values: {
                                                nombre: "",
                                                precio: "",
                                                talle: "",
                                                stock: "",
                                                descripcion: "",
                                                tipoProducto: "",
                                                tipo: "",
                                                imagenes: []
                                            },
                                        })
                                    }
                                    else
                                        console.log('Accesorio no ingresado');
                                }

                                //navigate('/productos')
                            }


                        }}>
                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form className='formUsuario' onSubmit={handleSubmit}>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Nombre</span>
                                        <input required pattern='[A-Za-z0-9 ]{1,50}' type="text" name='nombre'
                                            onChange={handleChange} value={values.nombre} />
                                    </label>
                                </div>
                                <div className='divConainerChBoxProducto'>
                                    {chkbs.map((item) => {
                                        return (
                                            <label key={item.id}>
                                                <input type='checkbox' checked={item.isChecked} onChange={() => onChangeCheckBoxs(item.id)} value={values.tipoProducto} />
                                                <h4>{item.name}</h4>
                                            </label>
                                        );
                                    })}

                                </div>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Precio</span>
                                        <input required pattern="[0-9]{1,12}" type="number" name='precio'
                                            onChange={handleChange} value={values.precio} />
                                    </label>
                                </div>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Talle</span>
                                        <input required pattern="[A-Za-z0-9 ]{1,10}" type="text" name='talle'
                                            onChange={handleChange} value={values.talle} />
                                    </label>
                                </div>

                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Stock</span>
                                        <input required pattern="[0-9]{1,4}" type="number" name='stock'
                                            onChange={handleChange} value={values.stock} />
                                    </label>
                                </div>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Descripcion</span>
                                        <input required pattern="[A-Za-z0-9 ]{1,200}" type="text" name='descripcion'
                                            onChange={handleChange} value={values.descripcion} />
                                    </label>
                                </div>
                                <div className='div-subir-imagenes'>
                                    <div id='drag-area'>
                                        <h4 id='h4-img'>Arrastre y suelte imágenes</h4>
                                        <span>0</span>
                                        <button id='button-img'>Seleccione sus archivos</button>
                                        <input id='inp-file' type="file" name='imagenes' hidden multiple
                                        />

                                    </div>

                                </div>
                                <button className='bontonCategoria btnCreate' type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Creando..." : "Crear"}
                                </button>
                            </Form>
                        )}

                    </Formik>
                </div>
                <div className='createProductoContainer formContainer'>
                    <h2>Imagenes cargadas</h2>
                    <div className='formUsuario'>
                        <div id='imgs-preview'></div>
                    </div>

                </div>
            </div>
            <section className='listaProductosABM'>
                <ul>
                    {
                        productos.map(product => (
                            <li key={product.idProducto} className='itemProductABM'>
                                <strong>{product.nombre}</strong>
                                <strong>{product.precio}</strong>
                                <p>Stock: {product.stock}</p>
                                <p>Talle: {product.talle}</p>
                                <p>Desc: {product.descripcion}</p>
                                <button>Modificar</button>
                                <button>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>

            </section >
        </>
    )
}
