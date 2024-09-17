import { pool } from "../db.js"

//CATEGORIA
export const getCarrito = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Categoria`,[req.params.idUsuario])
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}