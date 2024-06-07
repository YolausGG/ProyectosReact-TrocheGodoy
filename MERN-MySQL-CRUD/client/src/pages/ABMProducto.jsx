import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { createProductoRequest, deleteProductoRequest } from '../api/productos.api.js'
import { useProductos } from '../contexts/productos.jsx'
import { useMarcas } from '../contexts/marcas.jsx'
import { useCategorias } from '../contexts/categorias.jsx'

import { inputsInteractivos, marcaYCategoriaInteractivas } from "../hooks/forms.js"
import { createAccesorioRequest, createCalzadoRequest, createVestimentaRequest } from '../api/tipoProducto.api.js'
import { createProductosTalleColorRequest, deleteProductosTalleColorRequest } from '../api/prodcutosTalleColor.api.js'
import { showFiles } from '../hooks/imagen.js'
import { createCategoriasProductoRequest } from '../api/productoCategoria.api.js'
import { createMarcasProductoRequest } from '../api/productoMarca.api.js'

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

    useEffect(() => {
        inputsInteractivos()
        marcaYCategoriaInteractivas()
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
        console.log('event');

        console.log(e.target.files);
        if (e.target.files.length == 1) {
            console.log('uno');
            setImagenes([...imagenes, e.target.files[0]])
        } else {
            console.log('dos');
            let lista = [...imagenes, ...e.target.files]
            setImagenes(lista);
        }
        showFiles(e.target.files)
    }

    const cargarMarca = (e) => {
        const select = document.getElementById('selectMarca')
        var mP = {
            idMarca: e.target.value,
            nombre: select.options[select.selectedIndex].textContent.trim()
        }
        var repetido = false

        marcasP.map(marca => {
            if (marca.idMarca == mP.idMarca) {
                repetido = true
                return
            }
        })
        repetido ? null : setMarcasP([...marcasP, mP])

    }
    const cargarCategoria = (e) => {
        const select = document.getElementById('selectCategoria')

        var cP = {
            idCategoria: e.target.value,
            nombre: select.options[select.selectedIndex].textContent.trim()
        }
        var repetido = false

        categoriasP.map(cat => {
            if (cat.idCategoria == cP.idCategoria) {
                repetido = true
                return
            }
        })
        repetido ? null : setCategoriasP([...categoriasP, cP])

    }
    const quitarMarca = (idMarca) => {

        const newArray = marcasP?.filter(marca => marca.idMarca != idMarca)
        setMarcasP(newArray)
    }
    const quitarCategoria = (idCategoria) => {

        const newArray = categoriasP?.filter(categoria => categoria.idCategoria != idCategoria)
        setCategoriasP(newArray)
    }

    const eliminarProducto = async (pProducto) => {
        const data = {
            talle: pProducto.talle,
            color: pProducto.color
        }
        console.log(pProducto);
        try {
            const responsePTL = await deleteProductosTalleColorRequest(pProducto.idProducto, data)

            if (responsePTL.status == 200) {
                try {
                    const responseDP = await deleteProductoRequest(pProducto.idProducto)
                    responseDP.status == 22 ? console.log('Producto eliminado por Completo') : console.log('Producto No eliminado por Completo');
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Producto No eliminado de Talle Color');
            }
        } catch (error) {
            console.error(error);
        }


    }
    return (
        <>
            <div className='container-forms'>
                <div className='createProductoContainer'>
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
                                                .then(res => {
                                                    if (res.status == 200) {
                                                        setImagenes([])
                                                        showFiles(null)
                                                    }
                                                    console.log(res)
                                                })
                                                .catch(err => {
                                                    console.error(err);
                                                })
                                        });
                                        //createImagenRequest()
                                    }
                                    if (categoriasP.length > 0) {
                                        categoriasP.forEach(async catP => {
                                            var respuestaCCP = await createCategoriasProductoRequest({ idProducto: respuestaP.data.idProducto, idCategoria: catP.idCategoria })
                                           
                                            respuestaCCP.status == 200 ? console.log('Categoria dada de alta a Producto') : console.log('Categoria NO dada de alta a Producto');
                                        })
                                        setCategoriasP([])
                                    }
                                    if (marcasP.length > 0) {
                                        marcasP.forEach(async marcaP => {
                                            var respuestaCMP = await createMarcasProductoRequest({ idProducto: respuestaP.data.idProducto, idMarca: marcaP.idMarca })
                                            
                                            respuestaCMP.status == 200 ? console.log('Marca dada de alta a Producto') : console.log('Marca NO dada de alta a Producto');
                                        })
                                        setMarcasP([])
                                    }

                                    switch (producto.tipoProducto) {
                                        case 'Calzado': {
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
                                            break;
                                        }
                                        case 'Vestimenta': {
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
                                            break;
                                        }
                                        case 'Accesorio': {
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
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                }
                            }


                        }}>
                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form encType='multipart/form-data' className='form-ABM-producto estandarForm' onSubmit={handleSubmit}>
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
                                <div className='containerMC'>
                                    <label className='labelMC'>
                                        <span className='spanMC' >Marcas</span>
                                        <select id='selectMarca' className='divSimpleInp selectMC' name='producto.marca'
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
                                <div className='containerMC'>
                                    <label className='labelMC'>
                                        <span className='spanMC'>Categorias</span>
                                        <select id='selectCategoria' className='divSimpleInp selectMC' name='producto.categoria'
                                            onChange={cargarCategoria} value={values.marcaSelected}
                                        >
                                            <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                            {categorias.map((cat) => (
                                                <option key={cat.idCategoria} value={cat.idCategoria}>
                                                    {cat.nombre}
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
                <div className='containers-list-selecteds'>
                    <div className='createProductoContainer'>
                        <h3>Imagenes cargadas</h3>
                        <div className='lista-agergados-productos'>
                            <div id='imgs-preview'></div>
                        </div>
                    </div>
                    <div className='createProductoContainer'>
                        <h3>Marcas Seleccoinadas</h3>
                        <div className='lista-agergados-productos'>
                            {
                                marcasP?.map(marca => (
                                    <div className='item-selecionado' key={marca.idMarca}>
                                        <strong>{marca.nombre}</strong>
                                        <button className='btn-quitar-marca' onClick={() => quitarMarca(marca.idMarca)}>X</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='createProductoContainer'>
                        <h3>Categorias Seleccoinadas</h3>
                        <div className='lista-agergados-productos'>
                            {
                                categoriasP?.map(cat => (
                                    <div className='item-selecionado' key={cat.idCategoria}>
                                        <strong >{cat.nombre}</strong>
                                        <button className='btn-quitar-marca' onClick={() => quitarCategoria(cat.idCategoria)}>X</button>
                                    </div>
                                ))
                            }
                        </div>
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
                                <button >Modificar</button>
                                <button onClick={() => { eliminarProducto(product) }}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </section >
        </>
    )
}
