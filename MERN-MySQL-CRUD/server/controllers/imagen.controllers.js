import { pool } from "../db.js";


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
   

   
}


