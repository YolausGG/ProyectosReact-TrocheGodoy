import axios from 'axios'

export const getProductosRequest = async () =>
    await axios.get('http://localhost:4000/productos')

export const getProductosCategoriasRequest = async (idCategorias) =>
    await axios.get('http://localhost:4000/productosCategorias', idCategorias)

export const getProductoRequest = async (idProducto) =>
    await axios.get(`http://localhost:4000/producto/${idProducto}`)

export const createProductoRequest = async (producto) =>
    await axios.post('http://localhost:4000/producto', producto)

export const deleteProductoRequest = async (idProducto) =>
    await axios.delete(`http://localhost:4000/producto/${idProducto}`)

export const updateProductoRequest = async (idProducto, newProducto) =>
    await axios.put(`http://localhost:4000/producto/${idProducto}`, newProducto)