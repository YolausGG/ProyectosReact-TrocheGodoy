import axios from 'axios';

export const getCalzadosRequest = async () =>
    await axios.get('http://localhost:4000/calzados')

export const getCalzadoRequest = async (id) =>
    await axios.get(`http://localhost:4000/calzado/${id}`)

export const createCalzadoRequest = async (id) =>
    await axios.post(`http://localhost:4000/calzado/${id}`)

export const deleteCalzadoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/calzado/${id}`)


export const getVestimentasRequest = async () =>
    await axios.get('http://localhost:4000/vestimentas')

export const getVestimentaRequest = async (id) =>
    await axios.get(`http://localhost:4000/vestimenta/${id}`)

export const createVestimentaRequest = async (id) =>
    await axios.post(`http://localhost:4000/vestimenta/${id}`)

export const deleteVestimentaRequest = async (id) =>
    await axios.delete(`http://localhost:4000/vestimenta/${id}`)


export const getAccesoriosRequest = async () =>
    await axios.get('http://localhost:4000/accesorios')

export const getAccesorioRequest = async (id) =>
    await axios.get(`http://localhost:4000/accesorio/${id}`)

export const createAccesorioRequest = async (id) =>
    await axios.post(`http://localhost:4000/accesorio/${id}`)

export const deleteAccesorioRequest = async (id) =>
    await axios.delete(`http://localhost:4000/accesorio/${id}`)

