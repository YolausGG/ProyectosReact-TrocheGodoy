import axios from 'axios'

export const getProductosRequest = async () =>
    await axios.get('http://localhost:4000/productos')

export const getProductosCategoriasRequest = async (idCategorias) =>
    await axios.get('http://localhost:4000/productosCategorias', idCategorias)

export const getProductoRequest = async (id) =>
    await axios.get(`http://localhost:4000/producto/${id}`)

export const createProductoRequest = async (producto) =>
    await axios.post('http://localhost:4000/producto', producto)

export const deleteProductoRequest = async (id) =>
    await axios.delete(`http://localhost:4000/producto/${id}`)

export const updateProductoRequest = async (id, newProducto) =>
    await axios.put(`http://localhost:4000/producto/${id}`, newProducto)