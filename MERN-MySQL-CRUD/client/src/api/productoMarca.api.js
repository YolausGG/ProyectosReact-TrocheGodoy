import axios from 'axios'

export const getMarcasIdProductoRequest = async (id) =>
    await axios.get(`http://localhost:4000/marcasProducto/${id}`)