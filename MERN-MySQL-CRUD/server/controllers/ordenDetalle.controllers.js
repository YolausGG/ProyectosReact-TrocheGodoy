import { pool } from "../db.js"

//ORDEN DETALLE

export const getOrdenDetallesPorIdOrden = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM OrdenDetalle WHERE idOrden = ?`, [req.params.idOrden])
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const createOrdenDetalle = async (req, res) => {
    try {
        const { idOrden, idProducto, cantidad, precio } = req.body
        const [result] = await pool.promise().query(`INSERT INTO OrdenDetalle (idOrden, idProducto, cantidad, precio) VALUES (?, ?, ?, ?)`, [idOrden, idProducto, cantidad, precio])
        res.json({           
            idOrden,
            idProducto,
            cantidad,
            precio
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const deleteOrdenDetalle = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM OrdenDetalle WHERE idOrden = ? and idProdcuto = ?`, [req.params.idOrden, req.params.idProducto])
        if (result.affectedRows > 0) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: 'OrdenDetalle no encontrada' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}



