import axios from 'axios'

export const getCategoriasIdProductoRequest = async (id) =>
    await axios.get(`http://localhost:4000/categoriasProducto/${id}`)

export const createCategoriasProductoRequest = async (productoCategorias) =>
    await axios.post(`http://localhost:4000/categoriasProducto`, productoCategorias)

export const deleteCategoriaProductoRequest = async (idProducto, idCategoria) =>
    await axios.delete(`http://localhost:4000/categoriasProducto/producto/${idProducto}/${idCategoria}`)