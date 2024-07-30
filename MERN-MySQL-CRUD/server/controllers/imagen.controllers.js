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

    const { titulo, URLImagen } = req.body

    const [result] = await pool.promise().query(`Insert into Imagen (idProducto, titulo, URLImagen)
        values(?,?,?)`, [req.params.idProducto, titulo, URLImagen])

    try {
        res.json({
            idImagen: result.insertId,
            idProducto: req.params.idProducto,
            titulo: titulo,
            URLImagen: URLImagen
        })
    } catch (error) {
        console.error(error)
    }
}


