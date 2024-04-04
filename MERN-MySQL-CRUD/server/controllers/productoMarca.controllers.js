import { pool } from "../db.js";

export const getMarcasIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select M.idMarca, M.nombre 
        from ProductoMarca PM inner join Marca M on PM.idMarca = M.idMarca 
        where PM.idProducto = ?`, [req.params.id]);
    console.log(result);
    try {

        res.json(
            { result }
        )

    } catch (error) {

        console.error(error)
    }
};