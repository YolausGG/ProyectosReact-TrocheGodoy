import React, { useEffect, useState } from 'react';
import { useCarrito } from '../contexts/carrito';
import ProductoCompraFinal from '../components/ProductoCompraFinal';
import NuevaDireccion from '../components/NuevaDireccion';

import { Form, Formik } from 'formik';
import { createFormaDePagoRequest } from '../api/formaDePago.api';
import { createFormaDePagoPagoOnlineRequest, createFormaDePagoEfectivoRequest, createFormaDePagoTransferenciaRequest } from '../api/tipoFormaDePago';
import { getDireccionIdUsuarioRequest } from '../api/direccion.api';
import { Link, useNavigate } from "react-router-dom";
import '../styles/confirmarCompra.css';
import { useProductos } from '../contexts/productos';

import { inputsInteractivos, fechasInteractivos } from "../hooks/forms.js"


function ConfirmarCompra() {

    const { productosCarrito, precioTotal } = useCarrito();
    const { idUsuarioLogeado } = useProductos();

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


    const [direcciones, setDirecciones] = useState([
        /*{
        idDireccion: 1,
        idUsuario: 1,
        calle: "",
        departamento: "",
        ciudad: "",
        referencia: "",
        codigoPostal: "",
        isChecked: false
        }*/
    ])

    const [pago, setPago] = useState({
        formaDePago: 'Pago Online',
        formaDePagoOnline: 'MercadoPago',
        idDireccion: 1,
        fechaVencimiento: { mes: "", year: "" },
        numeroTarjeta: "",
        codigoSeguridad: "",
        cantidadCuotas: 0,
        productosCarrito: productosCarrito,
        precio: 0
    });

    const months = [
        { value: "01" },
        { value: "02" },
        { value: "03" },
        { value: "04" },
        { value: "05" },
        { value: "06" },
        { value: "07" },
        { value: "08" },
        { value: "09" },
        { value: "10" },
        { value: "11" },
        { value: "12" }
    ];

    useEffect(() => {
        inputsInteractivos()
        fechasInteractivos()
        fetchDirecciones();
    }, [idUsuarioLogeado, chkbsFormaDePagoOnline]);

    const fetchDirecciones = async () => {
        try {
            if (idUsuarioLogeado != null) {
                const response = await getDireccionIdUsuarioRequest(idUsuarioLogeado); // Reemplaza '1' con el ID del usuario correspondiente  
                setDirecciones(response.data.map(dir => ({ ...dir, isChecked: false })));
                return
            }
        } catch (error) {
            console.error('Error al obtener las direcciones:', error);
        }
    };

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

    // Maneja el cambio de los checkbox de las Direcciones
    const onChangeDireccion = (id) => {
        setDirecciones(direcciones.map(dir => {
            if (dir.idDireccion === id) { setPago((pago) => ({ ...pago, idDireccion: dir.idDireccion })), seleccionarDireccion(id); return { ...dir, isChecked: true }; }
            else return { ...dir, isChecked: false };
        }))
    }

    const handleMonthChange = (nuevoMonths) => {
        setPago((prevPago) => ({
            ...prevPago,
            fechaVencimiento: {
                ...prevPago.fechaVencimiento,
                mes: nuevoMonths,
                // Actualiza el mes con el valor seleccionado
            },
        }));

        console.log('Valor seleccionado:', nuevoMonths);
    };

    const handleYearChange = (nuevoYear) => {
        setPago((prevPago) => ({
            ...prevPago,
            fechaVencimiento: {
                ...prevPago.fechaVencimiento,
                year: nuevoYear,
                // Actualiza el mes con el valor seleccionado
            },
        }));

        console.log('Valor seleccionado:', nuevoYear);
    };

    // Selecciona la dirección en el radio button
    const seleccionarDireccion = (idDireccion) => {

        const radio = document.getElementsByName('direccion');
        radio.forEach(rdo => {
            if (parseInt(rdo.value) === idDireccion) {
                rdo.checked = true;
            }
        });

    }


    // Cambia el formulario según la forma de pago seleccionada
    const changeFormFromaDePago = () => {

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
                    <div className='container-forma-pago-online'>
                        <h4 htmlFor="">Debito</h4>
                        <h5>Datos de Tarjeta</h5>
                        <div className="datos-tarjeta-container" />
                        <div className="divSimpleInp">
                            <label htmlFor="numeroTarjeta">
                                <span>Número de Tarjeta</span>
                                <input type="number" id="numeroTarjeta" name="numeroTarjeta" required />
                            </label>
                        </div>

                        <div className='container-info-tarjeta'>
                            <div className="divSimpleInp">
                                <label htmlFor="codigoSeguridad">
                                    <span>Código de seguridad</span>
                                    <input type="number" id="codigoSeguridad" min="1000" max="9999" name="codigoSeguridad" required />
                                </label>
                            </div>

                            <label htmlFor="fechaVencimiento">Fecha Vencimiento:</label>
                            <div className='container-fechas-confirmar-compra'>
                                <div className='containerMesFN'>
                                    <label className='labelMesFN'>
                                        <span id='idSpanMesFN' className='spanMesFN'>Mes</span>
                                        <select id='select-mes-tarjeta' className='divSimpleInp selectMes' name='fechaVencimiento.mes'
                                            onChange={(e) => handleMonthChange(e.target.value)} value={pago.fechaVencimiento.mes}
                                        >
                                            <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                            {months.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.value}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Año</span>
                                        <input required maxLength={4} type="text" name='fechaVencimiento.year'
                                            onChange={(e) => handleYearChange(e.target.value)} value={pago.fechaVencimiento.year} />
                                    </label>
                                </div>
                            </div>
                            <div className="datos-tarjeta-container" />
                        </div>
                    </div >
                );
            }
            case 'Credito': {
                return (
                    <div className='container-forma-pago-online'>
                        <h4 htmlFor="">Credito</h4>

                        <h5>Datos de Tarjeta</h5>
                        <div className="datos-tarjeta-container" />
                        <div className="divSimpleInp">
                            <label htmlFor="numeroTarjeta">
                                <span>Número de Tarjeta</span>
                                <input type="number" id="numeroTarjeta" name="numeroTarjeta" required />
                            </label>
                        </div>

                        <div className='container-info-tarjeta'>
                            <div className="divSimpleInp">
                                <label htmlFor="codigoSeguridad">
                                    <span>Código de seguridad</span>
                                    <input type="number" id="codigoSeguridad" min="1000" max="9999" name="codigoSeguridad" required />
                                </label>
                            </div>

                            <label htmlFor="fechaVencimiento">Fecha Vencimiento:</label>
                            <div className='container-fechas-confirmar-compra'>
                                <div className='containerMesFN'>
                                    <label className='labelMesFN'>
                                        <span id='idSpanMesFN' className='spanMesFN'>Mes</span>
                                        <select id='select-mes-tarjeta' className='divSimpleInp selectMes' name='fechaVencimiento.mes'
                                            onChange={(e) => handleMonthChange(e.target.value)} value={pago.fechaVencimiento.mes}
                                        >
                                            <option className='optionVacio' key={"-1"} value={"-1"}></option>
                                            {months.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.value}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='divSimpleInp'>
                                    <label>
                                        <span>Año</span>
                                        <input required maxLength={4} type="text" name='fechaVencimiento.year'
                                            onChange={(e) => handleYearChange(e.target.value)} value={pago.fechaVencimiento.year} />
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="datos-tarjeta-container" />
                        <div className="divSimpleInp">
                            <label htmlFor="cantidadCuotas">
                                <span>Cantidad de Cuotas</span>
                                <input type="number" id="cantidadCuotas" min="2" max="120" name="codigoSeguridad" required />
                            </label>
                        </div>
                        
                    </div >
                );
            }
            case 'MercadoPago': {
                return (
                    <div className='container-forma-pago-online'>
                        <h4 htmlFor="">Mercado Pago</h4>
                        <Link className='btn-redireccionar-mercadopago' to={'/productos'}>Redireccionar</Link>
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
                            const respuestaT = await createFormaDePagoPagoOnlineRequest(respuestaFDP.data.idFormaDePago, pago.cantidadCuotas)
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
                        case 'Efectivo': {
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
                        {
                            direcciones.length ?
                                <div className='estandarForm container-direcciones'>
                                    {
                                        direcciones?.map((dir) => {
                                            return (

                                                <a htmlFor="direccion" className='chkDireccion' onClick={() => onChangeDireccion(dir.idDireccion)} key={dir.idDireccion} >
                                                    <input className='rdoDireccion' type='radio' id={dir.idDireccion} name='direccion' value={dir.idDireccion} />
                                                    <div className='divDatosDireccion'>
                                                        <label>Direccion: </label>
                                                        <label>{dir.calle} </label>
                                                        <label>{dir.departamento} </label>
                                                        <label>{dir.ciudad} </label>
                                                        <br />
                                                        {dir.referencia ? <div><label>Referencia: </label><label>{dir.referencia}</label><br /></div> : null}
                                                        <label>Código postal: </label>
                                                        <label>{dir.codigoPostal}</label>
                                                    </div>
                                                </a>
                                            )
                                        })
                                    }

                                    <Link to={'/NuevaDireccion'} className='btnNuevaDireccion' id="btnNuevaDireccion" >Agregar Direccion</Link>

                                </div>
                                : <div className='estandarForm container-direcciones'>
                                    <h3>Direcciones</h3>
                                    <Link to='/inicioSesion' className='btnRedireccionInicioSesion'><h4>Iniciar sesion para agregar direccion</h4></Link>
                                </div>

                        }
                    </Form>
                )}

            </Formik>

        </div >
    );
}

export default ConfirmarCompra;