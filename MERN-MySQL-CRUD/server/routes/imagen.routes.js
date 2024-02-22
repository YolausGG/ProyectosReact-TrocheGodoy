import { Router } from "express";
import { pool } from "../db.js";
import {
    getImagenes, createImagen
} from '../controllers/imagen.controllers.js'
import multer from 'multer'
//import phat from 'phat'
import * as fs from 'node:fs'


/*
const diskstorage = multer.diskStorage({
    destination: (req, file, cd) => {

        cb(null, 'server/imagenesDB')
    },
    filename: (req, file, cd) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
/*const fileUpload = multer({
    storage: diskstorage
}).single('imagen')
*/
const storage = multer.diskStorage({
    destination: 'server/imagenesBD',

    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage: storage }).single('img')

//const upload = multer({ dest: 'server/imagenesBD' })

const router = Router()

router.get('/imagenes', getImagenes);



router.post('/imagen/:id', upload, async (req, res) => {

    console.log('req.params');
    console.log(req.params);
    console.log('req.file');
    console.log(req.file);
    const name = req.file.originalname
    const dataImagen = fs.readFileSync('server/imagenesBD/' + req.file.filename, { encoding: 'utf-8', })

    const [result] = await pool.promise().query(`Insert into Imagen (idProducto, titulo, dataImagen)
        values(?,?,?)`, [req.params.id, name, dataImagen])

    try {
        console.log(result)
        res.json({
            idImagen: result.insertId,
            idProducto: req.params.id,
            titulo,
            dataImagen
        })
    } catch (error) {
        console.error(error)
    }
})



export default router