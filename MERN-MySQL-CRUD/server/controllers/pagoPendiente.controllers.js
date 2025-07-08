import e from 'express';
import { pool } from '../db.js';

// PAGO PENDIENTE

export const getPagosPendientes = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM PagoPendiente`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getPagoPendienteIdUsuario = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT PP.*, O.idUsuario 
            FROM pagopendiente PP INNER JOIN Orden O ON PP.idOrden = O.idOrden 
            WHERE idUsuario = ?`, [req.params.idUsuario]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existen el Pagos Pendientes por ese ID de Usuario" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createPagoPendiente = async (req, res) => {
    try {
        const { idOrden, fechaLimite, monto } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO PagoPendiente (idOrden, fechaLimite, monto) VALUES (?, ?, ?)`, [idOrden, fechaLimite, monto]);
        res.json({
            idPagoPendiente: result.insertId,
            idOrden,
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deletePagoPendiente = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM PagoPendiente WHERE idPagoPendiente = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago Pendiente no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}   

export const updatePagoPendiente = async (req, res) => { 
    try {
        const { idOrden, fechaLimite, monto } = req.body;
        const [result] = await pool.promise().query(`UPDATE PagoPendiente SET idOrden = ?, fechaLimite = ?, monto = ? WHERE idPagoPendiente = ?`, [idOrden, fechaLimite, monto, req.params.id]);
        if (result.affectedRows > 0) {
            res.json({
                idPagoPendiente: req.params.id,
                idOrden,
                fechaLimite,
                monto
            });
        } else {
            res.status(404).json({ error: 'Pago Pendiente no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}