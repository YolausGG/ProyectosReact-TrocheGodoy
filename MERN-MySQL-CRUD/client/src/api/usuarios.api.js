import axios from 'axios'

export const getUsuariosRequest = async () =>
    await axios.get('http://localhost:4000/usuarios')

export const getUsuarioRequest = async (id) =>
    await axios.get(`http://localhost:4000/usuario/${id}`)

export const getIDUsuarioCorreoRequest = async (correo) =>
    await axios.get(`http://localhost:4000/usuario/${correo}`)

export const getSesionUsuarioRequest = async (usuario) =>
    await axios.post(`http://localhost:4000/buscarUsuario`, usuario)

export const createUsuarioRequest = async (usuario) =>
    await axios.post(`http://localhost:4000/usuario`, usuario)

export const updatePasswordRequest = async (id, datos) =>
    await axios.put(`http://localhost:4000/usuario/${id}`, datos)

export const changePasswordRequest = async (correo, password) =>
    await axios.post(`http://localhost:4000/usuario/${correo}`, password)

export const bajaUsuarioRequest = async (id) =>
    await axios.put(`http://localhost:4000/usuarioBaja/${id}`)

