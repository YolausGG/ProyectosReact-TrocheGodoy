import axios from 'axios'
import { Resend } from 'resend';

export const getUsuariosRequest = async () =>
    await axios.get('http://localhost:4000/usuarios')

export const getUsuarioRequest = async (id) =>
    await axios.get(`http://localhost:4000/usuario/${id}`)

export const getSesionUsuarioRequest = async (usuario) =>
    await axios.post(`http://localhost:4000/buscarUsuario`, usuario)

export const createUsuarioRequest = async (usuario) =>
    await axios.post(`http://localhost:4000/usuario`, usuario)

export const updatePasswordRequest = async (id, password) =>
    await axios.put(`http://localhost:4000/usuario/${id}`, password)

export const bajaUsuarioRequest = async (id) =>
    await axios.put(`http://localhost:4000/usuarioBaja/${id}`)


const resend = new Resend('re_SgYDSGnu_LbuXcuUq2zzhigxXKqYTNoeL');

export async function sendEmails() {

    try {


        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {               
                'Access-Control-Allow-Origin': 'http://localhost:4000',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resend}`,
            },
            body: JSON.stringify({
                from: 'Acme <onboarding@resend.dev>',
                to: ['nico_13mayo@hotmail.com'],
                subject: 'hello world',
                html: '<strong>it works!</strong>',
            }),
        });

        if (res.ok) {
            const data = await res.json();
            return Response.json(data);
        }

    } catch (error) {
        console.log(error)

    }
}