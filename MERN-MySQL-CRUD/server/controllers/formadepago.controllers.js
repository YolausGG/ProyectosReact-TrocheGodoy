import { pool } from "../db.js";

// FORMA DE PAGO
export const getFormasDePago = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM FormaDePago`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getFormaDePago = async (req, res) => { 
    try {
        const [result] = await pool.promise().query(`SELECT * FROM FormaDePago WHERE idFormaDePago = ?`, [req.params.idFormaDePago]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe la Forma de Pago" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
} 

export const createFormaDePago = async (req, res) => {
    try {
        const { formaDePago, monto } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO FormaDePago (formaDePago, monto) VALUES (?, ?)`, [formaDePago, monto]);
        res.json({
            idFormaDePago: result.insertId,
            formaDePago,
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteFormaDePago = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM FormaDePago WHERE idFormaDePago = ?`, [req.params.idFormaDePago]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Forma de Pago no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}   

export const updateFormaDePago = async (req, res) => {
    try {
        const { formaDePago, monto } = req.body;
        const [result] = await pool.promise().query(`UPDATE FormaDePago SET formaDePago = ?, monto = ? WHERE idFormaDePago = ?`, [formaDePago, monto, req.params.idFormaDePago]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe la Forma de Pago" });
        }
        res.json({
            idFormaDePago: req.params.idFormaDePago,
            formaDePago,
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}           
