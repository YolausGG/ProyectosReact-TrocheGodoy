import { Router } from "express";
import {
    getImagenes, createImagen,
    getImagenesIdProducto
} from '../controllers/imagen.controllers.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: 'server/imagenesTemporales',

    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage: storage }).single('img')


const router = Router()


router.get('/imagenes', getImagenes)

router.get('/imagenes/:idProducto', getImagenesIdProducto)

router.post('/imagen/:idProducto', upload, createImagen)



export default router