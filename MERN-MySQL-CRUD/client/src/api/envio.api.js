import axios from 'axios';

export const getEnviosRequest = async () =>
    await axios.get('http://localhost:4000/envios');
export const getEnvioIdRequest = async (idEnvio) =>
    await axios.get(`http://localhost:4000/envio/${idEnvio}`);
export const getEnviosIdDireccionRequest = async (idDireccion) =>
    await axios.get(`http://localhost:4000/envios/${idDireccion}`);
export const createEnvioRequest = async (envio) =>
    await axios.post('http://localhost:4000/envio', envio);
export const updateEnvioRequest = async (id, newEnvio) =>
    await axios.put(`http://localhost:4000/envio/${id}`, newEnvio);
export const deleteEnvioRequest = async (id) =>
    await axios.delete(`http://localhost:4000/envio/${id}`);
