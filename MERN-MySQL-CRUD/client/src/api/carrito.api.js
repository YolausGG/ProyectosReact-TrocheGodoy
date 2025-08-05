import axios from 'axios';

export const getCarritoRequest = async (idUsuario) =>
    await axios.get(`http://localhost:4000/carrito/${idUsuario}`);

export const addToCarritoRequest = async (idUsuario, producto) => 
    await axios.post(`http://localhost:4000/carrito/${idUsuario}`, producto);

export const deleteFromCarritoRequest = async (idUsuario, idProducto) =>
    await axios.delete(`http://localhost:4000/carrito/${idUsuario}/${idProducto}`);

export const vaciarCarritoRequest = async (idUsuario) =>
    await axios.delete(`http://localhost:4000/carrito/${idUsuario}`);

export const updateCarritoRequest = async (idUsuario, carrito) =>
    await axios.put(`http://localhost:4000/carrito/${idUsuario}`, carrito);