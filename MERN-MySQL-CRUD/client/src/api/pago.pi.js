import axios from 'axios';

export const getPagosRequest = async () =>
    await axios.get('http://localhost:4000/pagos');
export const getPagoIdRequest = async (id) =>
    await axios.get(`http://localhost:4000/pago/${id}`);
export const createPagoRequest = async (pago) =>
    await axios.post('http://localhost:4000/pago', pago);   
export const updatePagoRequest = async (id, newPago) =>
    await axios.put(`http://localhost:4000/pago/${id}`, newPago);
export const deletePagoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/pago/${id}`);

