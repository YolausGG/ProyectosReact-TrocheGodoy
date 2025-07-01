import { pool } from "../db.js"

//ORDEN

export const getOrdenes = async (req, res) => {

    const [result] = await pool.primise().query(`Select * from Orden`)
    try {
        res.json({
            result
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const getOrdenesUsuario = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Orden where idUsuario = ?`, [req.params.idUsuario])
    try {
        res.json({
            result
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const createOrden = async (req, res) => {
    try {
        const { idFormaDePago, fecha, monto } = req.body
        const [result] = await pool.promise().query(`Insert into Orden (idUsuario, idFormaDePago, fecha, monto) values(?,?,?,?)`, [req.params.idUsuario, idFormaDePago, fecha, monto])
        res.json({
            idOrden: result.insertId,
            idFormaDePago,
            fecha,
            monto
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const deleteOrden = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`Delete from Orden where idOrden = ?`, [req.params.idOrden])
        if (result.affectedRows > 0) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: 'Orden no encontrada' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}   

export const updateOrden = async (req, res) => {
    try {
        const { idFormaDePago, fecha, monto } = req.body
        const [result] = await pool.promise().query(`Update Orden set idFormaDePago = ?, fecha = ?, monto = ? where idOrden = ?`, [idFormaDePago, fecha, monto, req.params.idOrden])
        if (result.affectedRows > 0) {
            res.json({ message: 'Orden actualizada con éxito' })
        } else {
            res.status(404).json({ error: 'Orden no encontrada' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}


