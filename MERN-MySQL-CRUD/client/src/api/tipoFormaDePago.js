import axios from 'axios';

export const getFormaDePagoTarjetasRequest = async () =>
    await axios.get('http://localhost:4000/tarjetas')

export const getFormaDePagoTarjetaRequest = async (id) =>
    await axios.get(`http://localhost:4000/tarjeta/${id}`)

export const createFormaDePagoTarjetaRequest = async (id, data) =>
    await axios.post(`http://localhost:4000/tarjeta/${id}`, data)

export const deleteFormaDePagoTarjetaRequest = async (id) =>
    await axios.delete(`http://localhost:4000/tarjeta/${id}`)

export const updateFormaDePagoTarjetaRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/tarjeta/${id}`, data)



export const getFormaDePagoDepositosRequest = async () =>
    await axios.get('http://localhost:4000/depositos')

export const getFormaDePagoDepositoRequest = async (id) =>
    await axios.get(`http://localhost:4000/deposito/${id}`)

export const createFormaDePagoDepositoRequest = async (id) =>
    await axios.post(`http://localhost:4000/deposito/${id}`)

export const deleteFormaDePagoDepositoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/deposito/${id}`)

export const updateFormaDePagoDepositoRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/deposito/${id}`, data)


export const getFormaDePagoContadosRequest = async () =>
    await axios.get('http://localhost:4000/contados')

export const getFormaDePagoContadoRequest = async (id) =>
    await axios.get(`http://localhost:4000/contado/${id}`)

export const createFormaDePagoContadoRequest = async (id, data) =>
    await axios.post(`http://localhost:4000/contado/${id}`, data)

export const deleteFormaDePagoContadoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/contado/${id}`)

export const updateFormaDePagoContadoRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/contado/${id}`, data)