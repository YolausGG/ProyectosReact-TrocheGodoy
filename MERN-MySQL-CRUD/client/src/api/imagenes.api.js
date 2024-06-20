import axios from 'axios'

export const getImagenesRequest = async () =>
    await axios.get('http://localhost:4000/imagenes')

export const getImagenesIdProductoRequest = async (idProducto) =>
    await axios.get(`http://localhost:4000/imagenes/${idProducto}`)
    
export const createImagenRequest = async (idProducto, img) => {
    await axios.post(`http://localhost:4000/imagen/${idProducto}`, img)
}



