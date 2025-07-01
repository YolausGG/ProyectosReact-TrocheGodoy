import { pool } from "../db.js"

//Cararito
export const getCarrito = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Carrito when idUsuario = ?`,[req.params.idUsuario])
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}

export const addToCarrito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`Insert into Carrito (idUsuario, idProducto, cantidad) values(?,?,?)`, [req.body.idUsuario, req.body.idProducto, req.body.cantidad])
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
}

export const deleteFromCarrito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`Delete from Carrito where idUsuario = ? and idProducto = ?`, [req.params.idUsuario, req.params.idProducto])
        if (result.affectedRows > 0) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
}

export const updateCarrito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`Update Carrito set cantidad = ? where idUsuario = ? and idProducto = ?`, [req.body.cantidad, req.params.idUsuario, req.params.idProducto])
        if (result.affectedRows > 0) {
            res.json({ message: 'Cantidad actualizada con exito' })
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
}   

export const vaciarCarrito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`Delete from Carrito where idUsuario = ?`, [req.params.idUsuario])
        if (result.affectedRows > 0) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
}

