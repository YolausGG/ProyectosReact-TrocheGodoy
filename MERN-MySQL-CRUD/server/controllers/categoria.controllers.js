import { pool } from "../db.js"

//CATEGORIA
export const getCategorias = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Categoria")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}
export const getCategoria = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Categoria where idCategoria = ? ", [req.params.id]);
    try {
        if (result.length === 0)
            return res.status(404).json({ message: "No existe la categoria" })

        res.json(
            result[0]
        )

    } catch (error) {
        console.error(error)
    }
};
export const createCategoria = async (req, res) => {

    console.log("Body: "+ req.body)
    const { nombre } = req.body;
    const [result] = await pool.promise().query("insert into Categoria (nombre) values(?)", [nombre])
    try {
        console.log(result);
        res.json({
            idCategoria: result.insertId,
            nombre
        })
    } catch (error) {
        console.error(error)
    }

}
export const updateCategoria = async (req, res) => {
    const { nombre } = req.body
    const [result] = await pool.promise().query("Update Categoria Set nombre = ? Where idCategoria = ?", [nombre, req.params.id])
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }

}
export const deleteCategoria = async (req, res) => {
    const [result] = await pool.promise().query("Delete from Categoria where idCategoria = ? ", [req.params.id]);
    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe la categoria" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

