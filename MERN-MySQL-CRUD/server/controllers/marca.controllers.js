import { pool } from "../db.js"

//MARCA
export const getMarcas = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Marca")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}
export const getMarca = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Marca where idMarca = ? ", [req.params.id]);
    try {
        if (result.length === 0)
            return res.status(404).json({ message: "No existe la marca" })

        res.json(
            result[0]
        )

    } catch (error) {
        console.error(error)
    }
};
export const createMarca = async (req, res) => {

    console.log(req.body)
    const { nombre } = req.body;
    const [result] = await pool.promise().query("insert into Marca (nombre) values(?)", [nombre])
    try {
        console.log(result);
        res.json({
            id: result.insertId,
            nombre
        })
    } catch (error) {
        console.error(error)
    }


}
export const updateMarca = async (req, res) => {
    const { nombre } = req.body
    const [result] = await pool.promise().query("Update Marca Set nombre = ? Where idMarca = ?", [nombre, req.params.id])
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }

}
export const deleteMarca = async (req, res) => {
    const [result] = await pool.promise().query("Delete from Marca where idMarca = ? ", [req.params.id]);
    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe la marca" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}