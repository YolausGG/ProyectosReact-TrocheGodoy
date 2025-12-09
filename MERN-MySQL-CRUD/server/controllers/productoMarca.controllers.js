import { pool } from "../db.js";

export const getMarcasIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select M.idMarca, M.nombre 
        from ProductoMarca PM inner join Marca M on PM.idMarca = M.idMarca 
        where PM.idProducto = ?`, [req.params.id]);
    //console.log(result);
    try {
        res.json(
            { result }
        )

    } catch (error) {

        console.error(error)
    }
};

export const createMarcasProducto = async (req, res) => {

    const { idProducto, idMarca } = req.body

    const [result] = await pool.promise().query(`Insert into ProductoMarca (idProducto,idMarca)
        values(?,?)`, [idProducto, idMarca]);
    console.log(result);
    try {
        /* if (result.length === 0){
            return res.status(404).json({ message: "No existe la categoria" })
        
        }*/
        res.json(
            { result }
        )

    } catch (error) {

        console.error(error)
    }
};

export const deleteMarcasProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Delete from ProductoMarca where idProducto = ? and idMarca = ?`, [req.params.idProducto, req.params.idMarca]);
    console.log(result);
    try {
        res.json(
            { result }
        )
    } catch (error) {

        console.error(error)
    }
};