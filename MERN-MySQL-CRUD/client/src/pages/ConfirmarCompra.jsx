import React, { useState } from 'react';
import { useCarrito } from '../contexts/carrito';
import ProductoCompraFinal from '../components/ProductoCompraFinal';
import { Form, Formik } from 'formik';
import { createFormaDePagoRequest } from '../api/formaDePago.api';
import { createFormaDePagoContadoRequest, createFormaDePagoDepositoRequest, createFormaDePagoTarjetaRequest } from '../api/tipoFormaDePago';

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
                    const idUsuarioPrueba = 7

                    const orden = { idUsuario: idUsuarioPrueba, idFormaDePago: 4, fecha: new Date(), monto: precioTotal }
                    console.log(orden);


                    const respuestaFDP = await createFormaDePagoRequest({formaDePago: pago.formaDePago, monto: precioTotal})


                    switch (pago.formaDePago) {
                        case 'Tarjeta': {
                            const respuestaT = await createFormaDePagoTarjetaRequest(respuestaFDP.data.idFormaDePago, pago.CantidadCuotas)
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
                            const respuestaC = await createFormaDePagoContadoRequest(respuestaFDP.data.idFormaDePago)
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
                            const respuestaA = await createFormaDePagoDepositoRequest(respuestaFDP.data.idFormaDePago)
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