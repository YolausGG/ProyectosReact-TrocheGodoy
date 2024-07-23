import { pool } from "../db.js";

import * as fs from 'node:fs'

export const getImagenes = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Imagen")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}

export const getImagenesIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Imagen where idProducto = ?`, [req.params.idProducto])
    
    try {
        res.json(
            { result }
        )

    } catch (error) {
        console.error(error)
    }

}

export const createImagen = async (req, res) => {

    console.log('req.params');
    console.log(req.params);
    console.log('req.file');
    console.log(req.file);
    const name = req.file.originalname
    const dataImagen = fs.readFileSync('server/imagenesTemporales/' + req.file.filename)

    const [result] = await pool.promise().query(`Insert into Imagen (idProducto, titulo, dataImagen)
        values(?,?,?)`, [req.params.idProducto, name, dataImagen])

    try {
        console.log('Result alta imagen')
        console.log(result)
        res.json({
            idImagen: result.insertId,
            idProducto: req.params.idProducto,
            titulo: name,
            dataImagen: dataImagen
        })
    } catch (error) {
        console.error(error)
    }

}


