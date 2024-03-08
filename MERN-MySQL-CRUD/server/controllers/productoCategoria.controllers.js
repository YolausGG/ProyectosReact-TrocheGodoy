import { pool } from "../db.js";

export const getCategoriasIdCategoria = async (req, res) => {

    const [result] = await pool.promise().query(`Select C.idCategoria, C.nombre 
        from ProductoCategoria PC inner join Categoria C on PC.idCategoria = C.idCategoria 
        where C.idCategoria = ?`, [req.params.id]);
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