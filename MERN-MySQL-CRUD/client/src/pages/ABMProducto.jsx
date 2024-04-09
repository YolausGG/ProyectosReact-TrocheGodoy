import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { createProductoRequest } from '../api/productos.api.js'
import { useProductos } from '../contexts/productos.jsx'
import { useMarcas } from '../contexts/marcas.jsx'
import { useCategorias } from '../contexts/categorias.jsx'

import { inputsInteractivos, marcaYCategoriaIntetacticas } from "../hooks/forms.js"
import { useNavigate } from 'react-router-dom'
import { createAccesorioRequest, createCalzadoRequest, createVestimentaRequest } from '../api/tipoProducto.api.js'
import { createProductosTalleColorRequest } from '../api/prodcutosTalleColor.api.js'

//import { cargarImagen } from '../hooks/imagen.jsx'

export default function ABMProducto() {

    const { productos } = useProductos()
    const { marcas } = useMarcas()
    const { categorias } = useCategorias()

    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        talle: "",
        color: "",
        stock: "",
        descripcion: "",
        tipoProducto: ""
    })
    const [imagenes, setImagenes] = useState([])
    const [marcasP, setMarcasP] = useState([])
    const [categoriasP, setCategoriasP] = useState([])

    const [marcaSelected, setMarcaSelected] = useState()

    useEffect(() => {
        inputsInteractivos()
        marcaYCategoriaIntetacticas()
    }, [])

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

    function selectedHandler(e) {
        console.log(e.target.files);

        if (e.target.files.length == 1) {
            console.log('uno');
            setImagenes([...imagenes, e.target.files[0]])
        } else {
            console.log('dos');
            let lista = []
            for (let i = 0; i < e.target.files.length; i++) {

                const img = e.target.files[i]
                lista.push(img)
                console.log(img);

            }
            setImagenes(lista);
        }
    }

    const cargarMarca = (e) => {
        const select = document.getElementById('selectMarca')
        console.log(e.target.value);
        console.log(select.options[select.selectedIndex].textContent);
        
        var mP = {
            idMarca: e.target.value,
            nombre: select.options[select.selectedIndex].textContent
        }
        console.log(mP);
        setMarcasP([...marcasP, mP])

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
                            console.log('values:');
                            console.log(imagenes);
                            values.tipoProducto = producto.tipoProducto

                            const product = { nombre: values.nombre, precio: values.precio, descripcion: values.descripcion }
                            console.log(product);


                            const respuestaP = await createProductoRequest(product)

                            console.log(values);
                            console.log(respuestaP);
                            if (respuestaP.status == 200) {

                                const productoTalleColor = { idProducto: respuestaP.data.idProducto, talle: values.talle, color: values.color, stock: values.stock }

                                const respuestaPTC = await createProductosTalleColorRequest(productoTalleColor)
                                if (respuestaPTC.status == 200) {
                                    if (!imagenes) {
                                        alert('Ninguna imagen seleccionada')
                                    }
                                    else {
                                        imagenes.forEach(img => {

                                            const formData = new FormData()
                                            formData.append('img', img)

                                            //createImagenRequest(respuestaP.data.idProducto, img)
                                            console.log(img);
                                            fetch(`http://localhost:4000/imagen/${respuestaP.data.idProducto}`, {
                                                method: 'POST',
                                                body: formData
                                            })
                                                //.then(res => res.text())
                                                .then(res => console.log(res))
                                                .catch(err => {
                                                    console.log(err);
                                                })
                                        });
                                        setImagenes([])
                                        //createImagenRequest()
                                    }

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
                                                    color: "",
                                                    stock: "",
                                                    descripcion: "",
                                                    tipoProducto: "",
                                                    tipo: ""
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
                                                    color: "",
                                                    stock: "",
                                                    descripcion: "",
                                                    tipoProducto: "",
                                                    tipo: ""
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
                                                    color: "",
                                                    stock: "",
                                                    descripcion: "",
                                                    tipoProducto: "",
                                                    tipo: ""
                                                },
                                            })
                                        }
                                        else
                                            console.log('Accesorio no ingresado');
                                    }
                                }
                                //navigate('/productos')
                            }


                        }}>
                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form encType='multipart/form-data' className='formUsuario' onSubmit={handleSubmit}>
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
                                        <span>Marcas</span>
                                        <select id='selectMarca' className='selectMC' name='producto.marca'
                                            onChange={cargarMarca} value={values.marcaSelected}
                                        >
                                            <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                            {marcas.map((marca) => (
                                                <option key={marca.idMarca} value={marca.idMarca}>
                                                    {marca.nombre}
                                                </option>
                                            ))}
                                        </select>
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
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Color</span>
                                        <input required pattern='[A-Za-z0-9 ]{1,50}' type="text" name='color'
                                            onChange={handleChange} value={values.color} />
                                    </label>
                                </div>
                                <div className='div-inp-img'>
                                    <label>
                                        <span className='span-inp-img'>Seleccionar Archivos</span>
                                        <input id='inp-file' type="file" name='imagenes' multiple
                                            onChange={selectedHandler} value={''} />
                                    </label>

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
                <div className='createProductoContainer formContainer'>
                    <h2>Marcas Seleccoinadas</h2>
                    <div className='formUsuario'>
                        {
                            marcasP?.map(marca => (
                                <strong key={marca.idMarca}>{marca.nombre}</strong>
                            ))
                        }
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
