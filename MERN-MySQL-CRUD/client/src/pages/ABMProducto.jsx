import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import escoba from '../utils/icons/escoba.png'

import { createProductoRequest, deleteProductoRequest, updateProductoRequest } from '../api/productos.api.js'
import { useProductos } from '../contexts/productos.jsx'
import { useMarcas } from '../contexts/marcas.jsx'
import { useCategorias } from '../contexts/categorias.jsx'

import { inputsInteractivos, marcaYCategoriaInteractivas, inputsInteractivosModificarProducto } from "../hooks/forms.js"
import { createAccesorioRequest, createCalzadoRequest, createVestimentaRequest, deleteAccesorioRequest, deleteCalzadoRequest, deleteVestimentaRequest } from '../api/tipoProducto.api.js'
import { showFiles } from '../hooks/imagen.js'
import { createCategoriasProductoRequest, deleteCategoriaProductoRequest } from '../api/productoCategoria.api.js'
import { createMarcasProductoRequest, deleteMarcasProductoRequest } from '../api/productoMarca.api.js'
import { uploadFile } from '../hooks/supaBaseStorage.js'
import { createImagenRequest } from '../api/imagenes.api.js'


//import { cargarImagen } from '../hooks/imagen.jsx'

export default function ABMProducto() {

    const { loadProductos, productos } = useProductos()
    const { marcas } = useMarcas()
    const { categorias } = useCategorias()

    console.log(productos);

    const [producto, setProducto] = useState({
        idProducto: "",
        nombre: "",
        tipoProducto: "Calzado",
        precio: "",
        talle: "",
        marcas: [],
        categorias: [],
        stock: "",
        descripcion: "",
        estilo: "",
        imagenes: []

    })

    const [oldProducto, setOldProducto] = useState({
        idProducto: "",
        nombre: "",
        tipoProducto: "",
        precio: "",
        talle: "",
        marcas: [],
        categorias: [],
        stock: "",
        descripcion: "",
        estilo: "",
        imagenes: []
    })

    const [imagenes, setImagenes] = useState([])

    const [marcasP, setMarcasP] = useState([])

    const [categoriasP, setCategoriasP] = useState([])


    const [chkbs, setChks] = useState([
        { id: 1, isChecked: true, name: 'Calzado' },
        { id: 2, isChecked: false, name: 'Vestimenta' },
        { id: 3, isChecked: false, name: 'Accesorio' },
    ]);

    const [modificarCheck, setmodificarCheck] = useState(false)

    useEffect(() => {
        inputsInteractivos()
        marcaYCategoriaInteractivas()
    }, [producto])

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
            setImagenes([...imagenes, e.target.files[0]])
        } else {
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
        console.log(pProducto);

        try {
            const responseDP = await deleteProductoRequest(pProducto.idProducto)

            responseDP.status == 22 ? console.log('Producto eliminado por Completo') : console.log('Producto No eliminado por Completo');
            loadProductos()
        } catch (error) {
            console.error(error);
        }

    }

    const cargarProducto = async (pProducto) => {
        console.log('Cargar Producto para Modificar');
        console.log(pProducto);

        setProducto({
            idProducto: pProducto.idProducto,
            nombre: pProducto.nombre,
            tipoProducto: pProducto.tipoProducto,
            precio: pProducto.precio,
            talle: pProducto.talle,
            marcas: pProducto.marcas,
            categorias: pProducto.categorias,
            stock: pProducto.stock,
            descripcion: pProducto.descripcion,
            estilo: pProducto.estilo,
            imagenes: pProducto.imagenes
        })

        setOldProducto({
            idProducto: pProducto.idProducto,
            nombre: pProducto.nombre,
            tipoProducto: pProducto.tipoProducto,
            precio: pProducto.precio,
            talle: pProducto.talle,
            marcas: pProducto.marcas,
            categorias: pProducto.categorias,
            stock: pProducto.stock,
            descripcion: pProducto.descripcion,
            estilo: pProducto.estilo,
            imagenes: pProducto.imagenes
        })

        setCategoriasP(pProducto.categorias)
        setMarcasP(pProducto.marcas)
        setImagenes(pProducto.imagenes)
        //showFiles(pProducto.imagenes)

        marcarCategoriaYMarcaSeleccionadas(pProducto.categorias, pProducto.marcas)

        cargarTipoProductoSeleccionado(pProducto.tipoProducto)

        inputsInteractivosModificarProducto()

    }

    const marcarCategoriaYMarcaSeleccionadas = (pCategorias, pMarcas) => {

        const selectMarca = document.getElementById('selectMarca')
        const selectCategoria = document.getElementById('selectCategoria')

        //aqui
        pMarcas?.forEach(pMarca => {

            for (let i = 0; i < selectMarca.options.length; i++) {

                if (selectMarca.options[i].textContent == pMarca.nombre) {
                    selectMarca.selectedIndex = i
                    selectMarca.previousElementSibling.classList.add('top')
                    break;
                }
            }
        });

        pCategorias?.forEach(pCategoria => {

            for (let j = 0; j < selectCategoria.options.length; j++) {

                if (selectCategoria.options[j].textContent == pCategoria.nombre) {
                    selectCategoria.selectedIndex = j
                    selectCategoria.previousElementSibling.classList.add('top')
                    break;
                }

            }
        });
    }

    const cargarTipoProductoSeleccionado = (tipoProducto) => {

        const updatedChks = chkbs.map(chkb => {
            if (chkb.name === tipoProducto) {
                return { ...chkb, isChecked: true };
            } else {
                return { ...chkb, isChecked: false };
            }
        });
        setChks(updatedChks);
    }

    const limpiarCampos = () => {
        setProducto({
            idProducto: "",
            nombre: "",
            tipoProducto: "Calzado",
            precio: "",
            talle: "",
            marcas: [],
            categorias: [],
            stock: "",
            descripcion: "",
            estilo: "",
            imagenes: []
        })
        setCategoriasP([])
        setMarcasP([])
        setImagenes([])
        showFiles(null)
        marcarCategoriaYMarcaSeleccionadas(null, null)
        setmodificarCheck(false)
        cargarTipoProductoSeleccionado('Calzado')
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

                            console.log(values);

                            const product = { nombre: values.nombre, precio: values.precio, talle: values.talle, stock: values.stock, estilo: values.estilo, descripcion: values.descripcion, tipoProducto: producto.tipoProducto }
                            console.log(product);

                            const respuestaP = modificarCheck ? await updateProductoRequest(producto.idProducto, product) : await createProductoRequest(product)

                            console.log(respuestaP);

                            if (modificarCheck) {
                                console.log('Producto Modificado');
                                const oldProd = productos.find(p => p.idProducto === producto.idProducto);
                                setOldProducto(oldProd)
                            }

                            if (respuestaP.status == 200) {

                                if (!imagenes) {
                                    alert('Ninguna imagen seleccionada')
                                }
                                else if (!modificarCheck) {

                                    imagenes.forEach(async img => {
                                        console.log(img);

                                        let URLImagen = await uploadFile(img)
                                        console.log('URLImagen:' + URLImagen);

                                        let imgData = { titulo: img.name, URLImagen: URLImagen }

                                        var respuestaI = await createImagenRequest(respuestaP.data.idProducto, imgData)

                                        if (respuestaI.status == 200) {
                                            setImagenes([])
                                            showFiles(null)
                                            console.log('Imagen dada de alta a Producto')
                                        }
                                        else {
                                            console.log('Imagen NO dada de alta a Producto')
                                        }

                                    });

                                }
                                {
                                    if (modificarCheck) {
                                        //Modificar las categorias del producto
                                        //Eliminar las categorias que ya no estan
                                        oldProducto.categorias.forEach(async oldCat => {
                                            var encontrada = false
                                            categoriasP.forEach(newCat => {
                                                if (oldCat.idCategoria == newCat.idCategoria) {
                                                    encontrada = true
                                                }
                                            }
                                            )
                                            if (!encontrada) {

                                                var respuestaDCP = await deleteCategoriaProductoRequest(producto.idProducto, oldCat.idCategoria)
                                                respuestaDCP.status == 200 ? console.log('Categoria eliminada del Producto') : console.log('Categoria NO eliminada del Producto');



                                            }
                                        })
                                        //Agregar las nuevas categorias

                                        categoriasP.forEach(async newCat => {
                                            var encontrada = false
                                            oldProducto.categorias.forEach(oldCat => {
                                                if (newCat.idCategoria == oldCat.idCategoria) {
                                                    encontrada = true
                                                }
                                            }
                                            )
                                            if (!encontrada) {

                                                var respuestaCCP = await createCategoriasProductoRequest({ idProducto: producto.idProducto, idCategoria: newCat.idCategoria })
                                                respuestaCCP.status == 200 ? console.log('Categoria dada de alta a Producto') : console.log('Categoria NO dada de alta a Producto');

                                            }
                                        })

                                        loadProductos()

                                    } else if (categoriasP.length > 0) {
                                        categoriasP.forEach(async catP => {
                                            var respuestaCCP = createCategoriasProductoRequest({ idProducto: respuestaP.data.idProducto, idCategoria: catP.idCategoria })

                                            respuestaCCP.status == 200 ? console.log('Categoria dada de alta a Producto') : console.log('Categoria NO dada de alta a Producto');
                                        })
                                        setCategoriasP([])
                                    }

                                }
                                {
                                    if (modificarCheck) {
                                        //Modificar las marcas del producto
                                        //Eliminar las marcas que ya no estan
                                        oldProducto.marcas.forEach(async oldMar => {
                                            var encontrada = false
                                            marcasP.forEach(newMar => {
                                                if (oldMar.idMarca == newMar.idMarca) {
                                                    encontrada = true
                                                }
                                            }
                                            )
                                            if (!encontrada) {
                                                var respuestaDMP = await deleteMarcasProductoRequest(producto.idProducto, oldMar.idMarca)
                                                respuestaDMP.status == 200 ? console.log('Marca eliminada del Producto') : console.log('Marca NO eliminada del Producto');


                                            }
                                        })
                                        //Agregar las nuevas marcas
                                        marcasP.forEach(async newMar => {
                                            var encontrada = false
                                            oldProducto.marcas.forEach(oldMar => {
                                                if (newMar.idMarca == oldMar.idMarca) {
                                                    encontrada = true
                                                }
                                            }
                                            )
                                            if (!encontrada) {
                                                var respuestaCMP = await createMarcasProductoRequest({ idProducto: producto.idProducto, idMarca: newMar.idMarca })
                                                respuestaCMP.status == 200 ? console.log('Marca dada de alta a Producto') : console.log('Marca NO dada de alta a Producto');


                                            }
                                        })

                                        loadProductos()

                                    } else if (marcasP.length > 0) {
                                        marcasP.forEach(async marcaP => {
                                            var respuestaCMP = await createMarcasProductoRequest({ idProducto: respuestaP.data.idProducto, idMarca: marcaP.idMarca })

                                            respuestaCMP.status == 200 ? console.log('Marca dada de alta a Producto') : console.log('Marca NO dada de alta a Producto');
                                        })
                                        setMarcasP([])
                                    }
                                }
                                {


                                    if (modificarCheck) {

                                        if (producto.tipoProducto == oldProducto.tipoProducto) {
                                            console.log('Mismo Tipo de Producto, no se modifica nada en TipoProducto');
                                        }
                                        else {

                                            switch (oldProducto.tipoProducto) {
                                                case 'Calzado': {
                                                    console.log('Eliminar Calzado');
                                                    //Eliminar Calzado
                                                    var respuestaDC = await deleteCalzadoRequest(respuestaP.data.idProducto)
                                                    respuestaDC.status == 200 ? console.log('Calzado eliminado del Producto') : console.log('Calzado NO eliminado del Producto');
                                                    break;
                                                }
                                                case 'Vestimenta': {
                                                    console.log('Eliminar Vestimenta');
                                                    //Eliminar Vestimenta
                                                    var respuestaDV = await deleteVestimentaRequest(respuestaP.data.idProducto)
                                                    respuestaDV.status == 200 ? console.log('Vestimenta eliminada del Producto') : console.log('Vestimenta NO eliminada del Producto');
                                                    break;
                                                }
                                                case 'Accesorio': {
                                                    console.log('Eliminar Accesorio');
                                                    //Eliminar Accesorio    
                                                    var respuestaDA = await deleteAccesorioRequest(respuestaP.data.idProducto)
                                                    respuestaDA.status == 200 ? console.log('Accesorio eliminado del Producto') : console.log('Accesorio NO eliminado del Producto');
                                                    break;
                                                }
                                                default:
                                                    break;
                                            }

                                            switch (producto.tipoProducto) {
                                                case 'Calzado': {
                                                    //Cambió a Calzado
                                                    var respuestaCC = await createCalzadoRequest(respuestaP.data.idProducto)
                                                    respuestaCC.status == 200 ? console.log('Producto cambiado a Calzado') : console.log('Producto NO cambiado a Calzado');
                                                    break;
                                                }
                                                case 'Vestimenta': {
                                                    //Cambió a Vestimenta
                                                    var respuestaCV = await createVestimentaRequest(respuestaP.data.idProducto)
                                                    respuestaCV.status == 200 ? console.log('Producto cambiado a Vestimenta') : console.log('Producto NO cambiado a Vestimenta');
                                                    break;
                                                }
                                                case 'Accesorio': {
                                                    //Cambió a Accesorio    
                                                    var respuestaCA = await createAccesorioRequest(respuestaP.data.idProducto)
                                                    respuestaCA.status == 200 ? console.log('Producto cambiado a Accesorio') : console.log('Producto NO cambiado a Accesorio');
                                                    break;
                                                }
                                                default:
                                                    break;
                                            }
                                        }

                                    } else {
                                        switch (producto.tipoProducto) {
                                            case 'Calzado': {
                                                const respuestaC = await createCalzadoRequest(respuestaP.data.idProducto)
                                                console.log(respuestaC);
                                                if (respuestaC.status == 200) {
                                                    console.log(producto);
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
                                actions.setSubmitting(false);
                                actions.resetForm({
                                    values: {
                                        nombre: "",
                                        precio: "",
                                        talle: "",
                                        estilo: "",
                                        stock: "",
                                        descripcion: "",
                                        tipoProducto: "",
                                        tipo: ""
                                    },
                                })
                                limpiarCampos()
                                loadProductos()
                            }
                        }}>
                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form method='POST' encType='multipart/form-data' className='form-ABM-producto estandarForm' onSubmit={handleSubmit}>
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
                                                <input type='checkbox' id={item.id} checked={item.isChecked} onChange={() => onChangeCheckBoxs(item.id)} value={values.tipoProducto} />
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
                                        <span>Estilo</span>
                                        <input required pattern='[A-Za-z0-9 ]{1,50}' type="text" name='estilo'
                                            onChange={handleChange} value={values.estilo} />
                                    </label>
                                </div>
                                <div className='div-inp-img'>
                                    <label>
                                        <span className='span-inp-img'>Seleccionar Archivos</span>
                                        <input id='inp-file' type="file" name='imagenes' multiple
                                            onChange={selectedHandler} value={''} />
                                    </label>

                                </div>

                                <button className={`bontonCategoria ${producto.idProducto ? 'btnUpdate' : 'btnCreate'}`} type="submit" disabled={isSubmitting}>
                                    {modificarCheck ? isSubmitting ? "Modificando..." : "Modificar" : isSubmitting ? "Creando..." : "Crear"}
                                </button>



                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='containers-list-selecteds'>
                    <div className='createProductoContainer'>
                        <h3>Imagenes cargadas</h3>
                        <div className='lista-agergados-productos'>
                            <div id='imgs-preview'>

                            </div>
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
                    <a className='btn-limpiar-campos' onClick={() => limpiarCampos()} >
                        <img className='icon-add-carrito' src={escoba} alt={`Limpiar campos`} />
                    </a>
                </div>
            </div >
            <section className='listaProductosABM'>
                <ul className='lista-productos'>
                    {
                        productos.map(product => (
                            <li key={product.idProducto} className='itemProductABM'>
                                <strong>{product.nombre}</strong>
                                <strong>{product.precio}</strong>
                                <p>Stock: {product.stock}</p>
                                <p>Talle: {product.talle}</p>
                                <p>Desc: {product.descripcion}</p>
                                <button onClick={() => { cargarProducto(product), setmodificarCheck(true) }}>Modificar</button>
                                <button onClick={() => eliminarProducto(product)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </section >
        </>
    )
}
