import { pool } from "../db.js";

// PAGO

export const getPagos = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Pago`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}   

export const getPago = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Pago WHERE idPago = ?`, [req.params.idPago]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createPago = async (req, res) => {
    try {
        const { idOrden, idFormaDePago, monto } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO Pago (idOrden, idFormaDePago, monto) VALUES (?, ?, ?)`, [idOrden, idFormaDePago, monto]);
        res.json({
            idPago: result.insertId,
            idOrden,
            idFormaDePago,
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deletePago = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Pago WHERE idPago = ?`, [req.params.idPago]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
export const updatePago = async (req, res) => {
    try {
        const { idOrden, idFormaDePago, monto } = req.body;
        const [result] = await pool.promise().query(`UPDATE Pago SET idOrden = ?, idFormaDePago = ?, monto = ? WHERE idPago = ?`, [idOrden, idFormaDePago, monto, req.params.idPago]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json({
            idPago: req.params.idPago,
            idOrden,
            idFormaDePago,
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
