import axios from 'axios';

export const getPagosPendientesRequest = async () =>
    await axios.get(`http://localhost:4000/pagoPendientes`);

export const getPagoPendienteIdUsuarioRequest = async (idUsuario) =>
    await axios.get(`http://localhost:4000/pagoPendiente/${idUsuario}`);

export const createPagoPendienteRequest = async (pagoPendiente) =>
    await axios.post(`http://localhost:4000/pagoPendiente`, pagoPendiente);

export const deletePagoPendienteRequest = async (id) =>
    await axios.delete(`http://localhost:4000/pagoPendiente/${id}`);

export const updatePagoPendienteRequest = async (id, newPagoPendiente) =>
    await axios.put(`http://localhost:4000/pagoPendiente/${id}`, newPagoPendiente);