import React, { useState } from 'react';
import { useCarrito } from '../contexts/carrito';
import ProductoCompraFinal from '../components/ProductoCompraFinal';
import { Form, Formik } from 'formik';

function ConfirmarCompra() {

    const { productosCarrito, precioTotal } = useCarrito();

    const [chkbs, setChks] = useState([
        { id: 1, isChecked: true, name: 'Tarjeta' },
        { id: 2, isChecked: false, name: 'Contado' },
        { id: 3, isChecked: false, name: 'Deposito' },
    ]);

    const [pago, setPago] = useState({
        formaDePago: '',
        productosCarrito: productosCarrito,
        precio: 0
    });

    const onChangeCheckBoxs = (id) => {
        setChks(chkbs.map(chkb => {
            if (chkb.id === id) { pago.formaDePago = chkb.name; return { ...chkb, isChecked: true } }
            else return { ...chkb, isChecked: false };
        }))
    }

    return (
        <div className='container-confirmar-compra'>
            <h2>Confirmar Compra</h2>

            <Formik
                //initialValues={producto}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    console.log(productosCarrito);
                    console.log('values:');

                    const orden = { nombre: values.nombre, precio: values.precio, descripcion: values.descripcion }
                    console.log(product);

                    const respuestaP = await createProductoRequest(product)

                    console.log(values);
                    console.log(respuestaP);

                    if (respuestaP.status == 200) {

                        const productoTalleEstilo = { idProducto: respuestaP.data.idProducto, talle: values.talle, estilo: values.estilo, stock: values.stock }

                        const respuestaPTC = await createProductosTalleEstiloRequest(productoTalleEstilo)

                        if (respuestaPTC.status == 200) {
                            if (!imagenes) {
                                alert('Ninguna imagen seleccionada')
                            }
                            else {
                                imagenes.forEach(async img => {
                                    console.log(img);

                                    let URLImagen = await uploadFile(img)
                                    console.log('URLImagen:' + URLImagen);

                                    let imgData = { titulo: img.name, URLImagen: URLImagen }

                                    var respuestaI = await createImagenRequest(respuestaP.data.idProducto, imgData)

                                    if (respuestaI.status == 200) {
                                        setImagenes([])
                                        showFiles(null)
                                        loadProductos()
                                        console.log('Imagen dada de alta a Producto')
                                    }
                                    else {
                                        console.log('Imagen NO dada de alta a Producto')
                                    }

                                });
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

                            switch (pago.formaDePago) {
                                case 'Tarjeta': {
                                    const respuestaC = await createCalzadoRequest(respuestaP.data.idProducto)
                                    console.log(respuestaC);
                                    if (respuestaC.status == 200) {
                                        console.log(pago);
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
                                        console.log('Calzado ingresado con Éxito');

                                    }
                                    else
                                        console.log('Calzado no ingresado');
                                    break;
                                }
                                case 'Contado': {
                                    const respuestaV = await createVestimentaRequest(respuestaP.data.idProducto)
                                    console.log(respuestaV);
                                    if (respuestaV.status == 200) {
                                        console.log(pago);
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
                                        console.log('Vestimenta ingresada con Éxito');
                                    }
                                    else
                                        console.log('Vestimenta no ingresada');
                                    break;
                                }
                                case 'Desposito': {
                                    const respuestaA = await createAccesorioRequest(respuestaP.data.idProducto)
                                    console.log(respuestaA);
                                    if (respuestaA.status == 200) {
                                        console.log('Accesorio ingresado con Éxito');
                                        console.log(pago);

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
                    <Form method='POST' encType='multipart/form-data' className='form-confirmar-compra estandarForm' onSubmit={handleSubmit}>
                        <div className='container-productos-confirmar'>
                            {
                                productosCarrito?.map(producto => (
                                    <ProductoCompraFinal key={producto.idProducto} producto={producto} />
                                ))
                            }
                        </div>

                        <div className='divConainerChBoxFormaDePago'>
                            {chkbs.map((formaDePago) => {
                                return (
                                    <label key={formaDePago.id}>
                                        <input type='checkbox' id={formaDePago.id} checked={formaDePago.isChecked} onChange={() => onChangeCheckBoxs(formaDePago.id)} value={formaDePago.name} />
                                        <h4>{formaDePago.name}</h4>
                                    </label>
                                );
                            })}
                        </div>
                        <label className='lblPrecioTotal'>Precio total: {precioTotal}</label>

                        <button className='btn-confirmar-compra btnCreate' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Confirmando..." : "Confirmado"}
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
}

export default ConfirmarCompra;