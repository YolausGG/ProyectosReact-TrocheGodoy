import axios from 'axios'

export const getProductosRequest = async () =>
    await axios.get('http://localhost:4000/productosTalleColor')

export const getProductoTalleColorRequest = async (idProducto, data) =>
    await axios.get(`http://localhost:4000/productoTalleColor/${idProducto}`, data)

export const getProductosTalleColorIdProductoRequest = async (idProducto) =>
    await axios.get(`http://localhost:4000/productoTalleColorIdProducto/${idProducto}`)

export const createProductosTalleColorRequest = async (data) =>
    await axios.post('http://localhost:4000/productoTalleColor', data)

export const deleteProductosTalleColorRequest = async (idProducto, data) =>
    await axios.delete(`http://localhost:4000/productoTalleColor/${idProducto}`, data)

export const updateProductosTalleColorRequest = async (idProducto, data) =>
    await axios.put(`http://localhost:4000/productoTalleColor/${idProducto}`, data)