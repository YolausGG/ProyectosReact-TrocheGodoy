import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    getSesionUsuario,
    createUsuario,
    updatePassword,
    bajaUsuario,
} from '../controllers/usuario.controllers.js'

const router = Router()

router.get('/usuarios', getUsuarios)

router.get('/usuario/:id', getUsuario)

router.post('/buscarUsuario', getSesionUsuario)

router.post('/usuario', createUsuario)

router.put('/usuario/:id', updatePassword)

router.put('/usuarioBaja/:id', bajaUsuario)

export default router