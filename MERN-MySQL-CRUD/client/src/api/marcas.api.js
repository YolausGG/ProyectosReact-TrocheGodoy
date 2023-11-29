import axios from 'axios'

export const getMarcasRequest = async () =>
    await axios.get('http://localhost:4000/marcas')

export const getMarcaRequest = async (id) =>
    await axios.get(`http://localhost:4000/marca/${id}`)

export const createMarcaRequest = async (marca) =>
    await axios.post('http://localhost:4000/marca', marca)

export const deleteMarcaRequest = async (id) =>
    await axios.delete(`http://localhost:4000/marca/${id}`)

export const updateMarcaRequest = async (id, newMarca) =>
    await axios.put(`http://localhost:4000/marca/${id}`, newMarca)