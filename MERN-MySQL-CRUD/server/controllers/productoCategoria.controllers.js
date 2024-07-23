import { pool } from "../db.js";

export const getCategoriasIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select C.idCategoria, C.nombre 
        from ProductoCategoria PC inner join Categoria C on PC.idCategoria = C.idCategoria 
        where PC.idProducto = ?`, [req.params.id]);
    //console.log(result);
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

export const createCategoriasProducto = async (req, res) => {

    const { idProducto, idCategoria } = req.body

    const [result] = await pool.promise().query(`Insert into ProductoCategoria (idProducto,idCategoria)
        values(?,?)`, [idProducto, idCategoria]);
    //console.log(result);
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