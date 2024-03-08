import axios from 'axios'

export const getCategoriasIdProductoRequest = async (id) =>
    await axios.get(`http://localhost:4000/categoriasProducto/${id}`)