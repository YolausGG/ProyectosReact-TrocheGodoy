import axios from 'axios';

//Pagos Online

export const getFormaDePagoPagosOnlineRequest = async () =>
    await axios.get('http://localhost:4000/pagosOnline')

export const getFormaDePagoPagoOnlineRequest = async (id) =>
    await axios.get(`http://localhost:4000/pagoOnline/${id}`)

export const createFormaDePagoPagoOnlineRequest = async (id, data) =>
    await axios.post(`http://localhost:4000/pagoOnline/${id}`, data)

export const deleteFormaDePagoPagoOnlineRequest = async (id) =>
    await axios.delete(`http://localhost:4000/pagoOnline/${id}`)

export const updateFormaDePagoPagoOnlineRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/pagoOnline/${id}`, data)


//Efectivo

export const getFormaDePagoEfectivoRequest = async () =>
    await axios.get('http://localhost:4000/efectivo')

export const getFormaDePagoEfectivoIdRequest = async (id) =>
    await axios.get(`http://localhost:4000/efectivo/${id}`)

export const createFormaDePagoEfectivoRequest = async (id, data) =>
    await axios.post(`http://localhost:4000/efectivo/${id}`, data)

export const deleteFormaDePagoEfectivoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/efectivo/${id}`)

export const updateFormaDePagoEfectivoRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/efectivo/${id}`, data)


//Transferencia

export const getFormaDePagoTransferenciasRequest = async () =>
    await axios.get('http://localhost:4000/transferencias')

export const getFormaDePagoTransferenciaRequest = async (id) =>
    await axios.get(`http://localhost:4000/transferencia/${id}`)

export const createFormaDePagoTransferenciaRequest = async (id) =>
    await axios.post(`http://localhost:4000/transferencia/${id}`)

export const deleteFormaDePagoTransferenciaRequest = async (id) =>
    await axios.delete(`http://localhost:4000/transferencia/${id}`)

export const updateFormaDePagoTransferenciaRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/transferencia/${id}`, data)
