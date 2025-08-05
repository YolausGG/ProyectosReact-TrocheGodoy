import axios  from 'axios';

export const getFormasDePagoRequest = async () =>
    await axios.get('http://localhost:4000/forasDePago')

export const getFormaDePagoRequest = async (id) =>
    await axios.get(`http://localhost:4000/foraDePago/${id}`)

export const createFormaDePagoRequest = async (data) =>
    await axios.post('http://localhost:4000/foraDePago', data)

export const deleteFormaDePagoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/foraDePago/${id}`)

export const updateFormaDePagoRequest = async (id, data) =>
    await axios.put(`http://localhost:4000/foraDePago/${id}`, data)