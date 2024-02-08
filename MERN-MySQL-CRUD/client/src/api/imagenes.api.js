import axios from 'axios'

export const getImagenesRequest = async () =>
    await axios.get('http://localhost:4000/imagenes')

export const createImagenRequest = async (imagen) =>
    await axios.post('http://localhost:4000/imagen', imagen)




