import e from 'cors';
import { pool } from '../db.js';

// TIPO FORMA DE PAGO
// PAGO ONLINE

export const getFormaDePagoPagoOnline = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM PagoOnline`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getFormaDePagoPagoOnlineId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM PagoOnline WHERE idPagoOnline = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago Online por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createFormaDePagoPagoOnline = async (req, res) => {
    try {
        const { cantidadCuotas } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO PagoOnline (idPagoOnline, cantidadCuotas) VALUES (?, ?)`, [req.params.id, cantidadCuotas]);
        res.json({
            idPagoOnline: req.params.id,
            cantidadCuotas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteFormaDePagoPagoOnline = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM PagoOnline WHERE idPagoOnline = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago Online no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoPagoOnline = async (req, res) => {
    try {
        const { cantidadCuotas, newId } = req.body;
        const [result] = await pool.promise().query(`UPDATE PagoOnline SET cantidadCuotas = ?, idPagoOnline = ? WHERE idPagoOnline = ?`, [cantidadCuotas, newId, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago Online por ese ID" });
        }
        res.json({
            idTarjeta: req.params.id,
            cantidadCuotas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//EFECTIVO

export const getFormaDePagoEfectivo = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Efectivo`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getFormaDePagoEfectivoId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Efectivo WHERE idEfectivo = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago en Efectivo por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createFormaDePagoEfectivo = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`INSERT INTO Efectivo (idEfectivo) VALUES (?)`, [req.params.id]);
        res.json({
            idEfectivo: req.params.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteFormaDePagoEfectivo = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Efectivo WHERE idEfectivo = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago en Efectivo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoEfectivo = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`UPDATE Efectivo SET idEfectivo = ? WHERE idEfectivo = ?`, [req.body.newId, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago en Efectivo por ese ID" });
        }
        res.json({
            idEfectivo: req.params.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//TRANSFERENCIA

export const getFormaDePagoTransferencia = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Transferencia`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getFormaDePagoTransferenciaId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Transferencia WHERE idTransferencia = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago por Transferencia por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createFormaDePagoTransferencia = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`INSERT INTO Transferencia (idTransferencia) VALUES (?)`, [req.params.id]);
        res.json({
            idTransferencia: req.params.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteFormaDePagoTransferencia = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Transferencia WHERE idTransferencia = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago por Transferencia no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoTransferencia = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`UPDATE Transferencia SET idTransferencia = ? WHERE idTransferencia = ?`, [req.body.newId, req.body.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago por Transferencia por ese ID" });
        }
        res.json({
            idTransferencia: req.params.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
