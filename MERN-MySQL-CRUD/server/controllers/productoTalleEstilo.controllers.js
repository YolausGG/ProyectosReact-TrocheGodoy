import { pool } from "../db.js";

export const getProductosTalleEstilo = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from ProductoTalleEstilo`)

    try {
        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const getProductoTalleEstilo = async (req, res) => {

    const { talle, estilo } = req.body

    const [result] = await pool.promise().query(`Select * from ProductoTalleEstilo where idProducto = ? and talle = ? and estilo = ?`, [req.params.id, talle, estilo])

    try {
        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const getProductosTalleEstiloIdProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from ProductoTalleEstilo where idProducto = ?`, [req.params.idProducto])
    
    try {
        res.json(
            result[0]
        )
    } catch (error) {
        console.error(error)
    }
}


export const createProductoTalleEstilo = async (req, res) => {

    const { idProducto, talle, estilo, stock } = req.body

    const [result] = await pool.promise().query(`Insert into ProductoTalleEstilo (idProducto, talle, estilo, stock)
        values(?,?,?,?)`, [idProducto, talle, estilo, stock])

    try {
        console.log(result)
        res.json({
            idProducto: idProducto,
            talle,
            estilo,
            stock,
        })
    } catch (error) {
        console.error(error)
    }
}

export const updateProductoTalleEstilo = async (req, res) => {

    const { idProducto, talle, estilo, stock } = req.body

    const [result] = await pool.promise().query(`Update Producto set talle = ?, estilo = ?, stock = ? where idProducto = ? and talle = ? and estilo = ?`, [talle, estilo, stock, idProducto])

    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}

export const deleteProductoTalleEstilo = async (req, res) => {

    const { talle, estilo } = res.body

    const [result] = await pool.promise().query(`Delete from ProductoTalleEstilo where idProducto = ? and talle = ? and estilo = ?`, [req.params.id, talle, estilo])

    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe el Producto" })

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}