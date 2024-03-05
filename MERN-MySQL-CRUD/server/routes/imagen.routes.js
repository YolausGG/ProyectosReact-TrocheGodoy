import { Router } from "express";
import { pool } from "../db.js";
import {
    getImagenes, createImagen
} from '../controllers/imagen.controllers.js'
import multer from 'multer'
import path from 'path'
import * as fs from 'node:fs'
import { log } from "console";


const storage = multer.diskStorage({
    destination: 'server/imagenesTemporales',

    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage: storage }).single('img')

const router = Router()


router.get('/imagenes', async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Imagen`)
    console.log('result');
    console.log(result);
    
    try {
        result.map(img => {
            console.log('img.dataImagen');
            console.log(img.dataImagen);
            //fs.writeFileSync(path.join(__dirname, '../imagenesDB/' + img.idImagen + '-' + img.titulo, buf))
            fs.writeFileSync('server/imagenesDB/' + img.idImagen + '-' + img.titulo, img.dataImagen)
        })

        const imagenesDir = fs.readdirSync('server/imagenesDB')

        console.log(imagenesDir)
        
        res.json(
            { result }
        )

    } catch (error) {
        console.error(error)
    }
});


router.post('/imagen/:id', upload, async (req, res) => {

    console.log('req.params');
    console.log(req.params);
    console.log('req.file');
    console.log(req.file);
    const name = req.file.originalname
    const dataImagen = fs.readFileSync('server/imagenesTemporales/' + req.file.filename, { encoding: 'utf-8', })

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