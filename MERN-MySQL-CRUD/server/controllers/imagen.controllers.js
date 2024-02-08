import { pool } from "../db.js";
import fileUpload  from "express-fileupload"



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

export const createImagen = async (req, res) => {

    const { idProducto, titulo, dataImagen } = req.body

    const [result] = await pool.promise().query(`Insert into Imagen (idProducto, titulo, dataImagen)
        values(?,?,?)`, [idProducto, titulo, dataImagen])

    try {
        console.log(result)
        res.json({
            idImagen: result.insertId,
            idProducto,
            titulo,
            dataImagen
        })
    } catch (error) {
        console.error(error)
    }
}


