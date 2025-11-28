import axios from 'axios'

export const getMarcasIdProductoRequest = async (id) =>
    await axios.get(`http://localhost:4000/marcasProducto/${id}`)

export const createMarcasProductoRequest = async (productoMarcas) =>
    await axios.post(`http://localhost:4000/marcasProducto`, productoMarcas)

export const deleteMarcasProductoRequest = async (idProducto, idMarca) =>
    await axios.delete(`http://localhost:4000/marcasProducto/producto/${idProducto}`, idMarca)