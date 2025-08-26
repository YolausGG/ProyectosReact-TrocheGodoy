import React, { useState } from 'react';
import { useCarrito } from '../contexts/carrito';
import ProductoCompraFinal from '../components/ProductoCompraFinal';
import { Form, Formik } from 'formik';
import { createFormaDePagoRequest } from '../api/formaDePago.api';
import { createFormaDePagoPagoOnlineRequest, createFormaDePagoEfectivoRequest, createFormaDePagoTransferenciaRequest } from '../api/tipoFormaDePago';

function ConfirmarCompra() {

    const { productosCarrito, precioTotal } = useCarrito();

    const [chkbsFormaDePago, setChkbsFormaDePago] = useState([
        { id: 1, isChecked: true, name: 'Pago Online' },
        { id: 2, isChecked: false, name: 'Efectivo' },
        { id: 3, isChecked: false, name: 'Transferencia' },
    ]);

    const [chkbsFormaDePagoOnline, setChkbsFormaDePagoOnline] = useState([
        { id: 1, isChecked: true, name: 'MercadoPago' },
        { id: 2, isChecked: false, name: 'Debito' },
        { id: 3, isChecked: false, name: 'Credito' },        
    ]);


    const [pago, setPago] = useState({
        formaDePago: 'Pago Online',
        formaDePagoOnline: 'MercadoPago',
        cantidadCuotas: 0,
        productosCarrito: productosCarrito,
        precio: 0
    });

    // Maneja el cambio de los checkbox de las formas de pago
    const onChangeCheckBoxsFormaDePago = (id) => {
        setChkbsFormaDePago(chkbsFormaDePago.map(chkb => {
            if (chkb.id === id) { pago.formaDePago = chkb.name; return { ...chkb, isChecked: true } }
            else return { ...chkb, isChecked: false };
        }))
    }
    // Maneja el cambio de los checkbox de las formas de pago Online
    const onChangeCheckBoxsFormaDePagoOnline = (id) => {
        setChkbsFormaDePagoOnline(chkbsFormaDePagoOnline.map(chkb => {
            if (chkb.id === id) { pago.formaDePagoOnline = chkb.name; return { ...chkb, isChecked: true } }
            else return { ...chkb, isChecked: false };
        }))
    }


    // Cambia el formulario según la forma de pago seleccionada

    const changeFormFromaDePago = (e) => {

        switch (pago.formaDePago) {
            case 'Pago Online': {
                return (
                    <div className='divContainerFormaDePagoOnline'>
                        <h4 className='lblFormaDePagoOnline'>Seleccione forma de pago online: </h4>
                        <div className='divContainerChBoxFormaDePagoOnline'>
                            {chkbsFormaDePagoOnline.map((tipoformaDePagoOnline) => {
                                return (
                                    <label key={tipoformaDePagoOnline.id}>
                                        <input type='checkbox' id={tipoformaDePagoOnline.id} checked={tipoformaDePagoOnline.isChecked} onChange={() => onChangeCheckBoxsFormaDePagoOnline(tipoformaDePagoOnline.id)} value={tipoformaDePagoOnline.name} />
                                        <h4>{tipoformaDePagoOnline.name}</h4>
                                    </label>
                                );
                            })}
                        </div>
                        {pago.formaDePagoOnline == '' ? '' : changeFormFromaDePagoOnline(pago.formaDePagoOnline)}

                    </div>
                );
            }
            case 'Efectivo': {
                return (
                    <div className='divCantidadCuotas'>
                        <h4 htmlFor="">Efectivo</h4>
                    </div>
                );
            }
            case 'Transferencia': {
                return (
                    <div className='divCantidadCuotas'>
                        <h4 htmlFor="">Transferencia</h4>
                    </div>
                );
            }
            default:
                return null;


        }

    }

    // Cambiar formulario según la forma de pago con tarjeta seleccionada
    const changeFormFromaDePagoOnline = (formaDePagoOnline) => {
        switch (formaDePagoOnline) {
            case 'Debito': {
                return (
                    <div className='divCantidadCuotas'>
                        <h4 htmlFor="">Debito</h4>
                        <label htmlFor="numeroTarjeta">Número de Tarjeta: </label>
                        <input type="number" id="numeroTarjeta" name="numeroTarjeta" required />
                    </div>
                );
            }
            case 'Credito': {
                return (
                    <div className='divContainerFormaPagoCredito'>
                        <h4 htmlFor="">Credito</h4>

                        <label htmlFor="numeroTarjeta">Número de Tarjeta: </label>
                        <input type="number" id="numeroTarjeta" name="numeroTarjeta" required />
                        <label htmlFor='cantidadCuotas'>Cantidad de Cuotas: </label>
                        <input type='number' id='cantidadCuotas' name='cantidadCuotas' min="2" max="12" required />
                    </div>
                );
            }
            case 'MercadoPago': {
                return (
                    <div className='divCantidadCuotas'>
                        <h4 htmlFor="">Mercado Pago</h4>
                    </div>
                );
            }
            default:
                return null;
        }
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
                    const idUsuarioPrueba = 7

                    const orden = { idUsuario: idUsuarioPrueba, idFormaDePago: 4, fecha: new Date(), monto: precioTotal }
                    console.log(orden);


                    const respuestaFDP = await createFormaDePagoRequest({ formaDePago: pago.formaDePago, monto: precioTotal })


                    switch (pago.formaDePago) {
                        case 'Tarjeta': {
                            const respuestaT = await createFormaDePagoPagoOnlineRequest(respuestaFDP.data.idFormaDePago, pago.CantidadCuotas)
                            console.log(respuestaT);
                            if (respuestaT.status == 200) {
                                console.log(pago);
                                actions.resetForm({
                                    values: {
                                        precio: "",
                                        tipo: ""
                                    },
                                })
                                console.log('Compra con Tarjeta ingresada con Éxito');

                            }
                            else
                                console.log('Compra con Tarjeta no ingresado');
                            break;
                        }
                        case 'Contado': {
                            const respuestaC = await createFormaDePagoEfectivoRequest(respuestaFDP.data.idFormaDePago)
                            console.log(respuestaC);
                            if (respuestaC.status == 200) {
                                console.log(pago);
                                actions.resetForm({
                                    values: {
                                        precio: "",
                                        tipo: ""
                                    },
                                })
                                console.log('Compra en Contado ingresada con Éxito');
                            }
                            else
                                console.log('Compra en Contado no ingresada');
                            break;
                        }
                        case 'Desposito': {
                            const respuestaA = await createFormaDePagoTransferenciaRequest(respuestaFDP.data.idFormaDePago)
                            console.log(respuestaA);
                            if (respuestaA.status == 200) {
                                console.log(pago);

                                actions.resetForm({
                                    values: {
                                        precio: "",
                                        tipo: ""
                                    },
                                })

                                console.log('Compra con Deposito ingresada con Éxito');
                            }
                            else
                                console.log('Compra con Deposito no ingresado');
                            break;
                        }
                        default:
                            break;
                    }

                    console.log(values);

                }}>
                {({ handleChange, handleSubmit, values, isSubmitting }) => (

                    <Form method='POST' encType='multipart/form-data' className='container-form-confirmar-compra' onSubmit={handleSubmit}>

                        <div className='container-productos-confirmar estandarForm'>
                            {
                                productosCarrito?.map(producto => (
                                    <ProductoCompraFinal key={producto.idProducto} producto={producto} />
                                ))
                            }
                        </div>
                        <div className='form-confirmar-compra estandarForm'>

                            <h3>Forma de Pago</h3>
                            <label className='lblFormaDePago'>Seleccione forma:</label>
                            <div className='divContainerChBoxFormaDePago'>
                                {chkbsFormaDePago.map((formaDePago) => {
                                    return (
                                        <label key={formaDePago.id}>
                                            <input type='checkbox' id={formaDePago.id} checked={formaDePago.isChecked} onChange={() => onChangeCheckBoxsFormaDePago(formaDePago.id)} value={formaDePago.name} />
                                            <h4>{formaDePago.name}</h4>
                                        </label>
                                    );
                                })}
                            </div>
                            {pago.formaDePago == '' ? '' : changeFormFromaDePago(pago.formaDePago)}


                            < label className='lblPrecioTotal'>Precio total: {precioTotal}</label>

                            <button className='btn-confirmar-compra btnCreate' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Confirmando..." : "Confirmado"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div >
    );
}

export default ConfirmarCompra;