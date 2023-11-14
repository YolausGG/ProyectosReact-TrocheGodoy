import axios from 'axios'

export const getCategoriasRequest = async () =>
    await axios.get('http://localhost:4000/categorias')

export const getCategoriaRequest = async (id) =>
    await axios.get(`http://localhost:4000/categoria/${id}`)

export const createCategoriaRequest = async (categoria) =>
    await axios.post('http://localhost:4000/categoria', categoria)

export const deleteCategoriaRequest = async (id) =>
    await axios.delete(`http://localhost:4000/categoria/${id}`)

export const updateCategoriaRequest = async (id, newCategoria) =>
    await axios.put(`http://localhost:4000/categoria/${id}`, newCategoria)
