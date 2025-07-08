import axios from 'axios';

export const getCarritoRequest = async (id) =>
    await axios.get(`http://localhost:4000/carrito/${id}`);
export const addToCarritoRequest = async (id, producto) => 
    await axios.post(`http://localhost:4000/carrito/${id}`, producto);
export const deleteFromCarritoRequest = async (idUsuario, idProducto) =>
    await axios.delete(`http://localhost:4000/carrito/${idUsuario}/${idProducto}`);
export const vaciarCarritoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/carrito/${id}`);
export const updateCarritoRequest = async (id, carrito) =>
    await axios.put(`http://localhost:4000/carrito/${id}`, carrito);