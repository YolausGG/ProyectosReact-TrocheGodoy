import axios from 'axios';

export const getDireccionesRequest = async () =>
    await axios.get('http://localhost:4000/direcciones');

export const getDireccionIdRequest = async (idDireccion) =>
    await axios.get(`http://localhost:4000/direccion/${idDireccion}`);

export const getDireccionIdUsuarioRequest = async (idUsuario) =>
    await axios.get(`http://localhost:4000/direccionesUsuario/${idUsuario}`);

export const createDireccionRequest = async (direccion) =>
    await axios.post('http://localhost:4000/direccion', direccion);

export const updateDireccionRequest = async (id, newDireccion) =>
    await axios.put(`http://localhost:4000/direccion/${id}`, newDireccion);

export const deleteEnvioRequest = async (id) =>
    await axios.delete(`http://localhost:4000/direccion/${id}`);