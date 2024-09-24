import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    getSesionUsuario,
    createUsuario,
    updatePassword,
    bajaUsuario,
    changePassword,
    getIDUsuarioCorreo,
} from '../controllers/usuario.controllers.js'

const router = Router()

router.get('/usuarios', getUsuarios)

router.get('/usuario/:id', getUsuario)

router.get('/usuario/:correo', getIDUsuarioCorreo)

router.post('/buscarUsuario', getSesionUsuario)

router.post('/usuario', createUsuario)

router.put('/usuario/:id', updatePassword)

router.post('/usuario/:correo', changePassword)

router.put('/usuarioBaja/:id', bajaUsuario)

export default router