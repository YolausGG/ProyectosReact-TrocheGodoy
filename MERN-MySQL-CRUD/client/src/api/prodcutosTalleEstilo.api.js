import axios from 'axios'

export const getProductosRequest = async () =>
    await axios.get('http://localhost:4000/productosTalleEstilo')

export const getProductoTallEstiloRequest = async (idProducto, data) =>
    await axios.get(`http://localhost:4000/productoTalleEstilo/${idProducto}`, data)

export const getProductosTalleEstiloIdProductoRequest = async (idProducto) =>
    await axios.get(`http://localhost:4000/productoTalleEstiloIdProducto/${idProducto}`)

export const createProductosTalleEstiloRequest = async (data) =>
    await axios.post('http://localhost:4000/productoTalleEstilo', data)

export const deleteProductosTalleEstiloRequest = async (idProducto, data) =>
    await axios.delete(`http://localhost:4000/productoTalleEstilo/${idProducto}`, data)

export const updateProductosTalleEstiloRequest = async (idProducto, data) =>
    await axios.put(`http://localhost:4000/productoTalleEstilo/${idProducto}`, data)