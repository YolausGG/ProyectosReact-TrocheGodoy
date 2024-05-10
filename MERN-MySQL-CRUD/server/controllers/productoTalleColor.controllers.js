import { pool } from "../db.js";

export const getProductosTalleColor = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from ProductoTalleColor`)

    try {
        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const getProductoTalleColor = async (req, res) => {

    const { talle, color } = req.body

    const [result] = await pool.promise().query(`Select * from ProductoTalleColor where idProducto = ? and talle = ? and color = ?`, [req.params.id, talle, color])

    try {
        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const getProductosTalleColorIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from ProductoTalleColor where idProducto = ?`, [req.params.idProducto])
    
    try {
        res.json(
            result[0]
        )
    } catch (error) {
        console.error(error)
    }
}


export const createProductoTalleColor = async (req, res) => {

    const { idProducto, talle, color, stock } = req.body

    const [result] = await pool.promise().query(`Insert into ProductoTalleColor (idProducto, talle, color, stock)
        values(?,?,?,?)`, [idProducto, talle, color, stock])

    try {
        console.log(result)
        res.json({
            idProducto: idProducto,
            talle,
            color,
            stock,
        })
    } catch (error) {
        console.error(error)
    }
}

export const updateProductoTalleColor = async (req, res) => {

    const { idProducto, talle, color, stock } = req.body

    const [result] = await pool.promise().query(`Update Producto set talle = ?, color = ?, stock = ? where idProducto = ? and talle = ? and color = ?`, [talle, color, stock, idProducto])

    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}

export const deleteProductoTalleColor = async (req, res) => {

    const { talle, color } = res.body

    const [result] = await pool.promise().query(`Delete from ProductoTalleColor where idProducto = ? and talle = ? and color = ?`, [req.params.id, talle, color])

    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe el Producto" })

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}