import axios  from 'axios';

export const getFormasDePagoRequest = async () =>
    await axios.get('http://localhost:4000/forasDePago')

export const getFormaDePagoRequest = async (id) =>
    await axios.get(`http://localhost:4000/foraDePago/${id}`)

export const createFormaDePagoRequest = async (marca) =>
    await axios.post('http://localhost:4000/foraDePago', marca)

export const deleteFormaDePagoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/foraDePago/${id}`)

export const updateFormaDePagoRequest = async (id, newMarca) =>
    await axios.put(`http://localhost:4000/foraDePago/${id}`, newMarca)