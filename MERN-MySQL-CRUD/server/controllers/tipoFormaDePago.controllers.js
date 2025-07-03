import e from 'cors';
import { pool } from '../db/pool.js';

// TIPO FORMA DE PAGO
// TARJETA

export const getFormaDePagoTarjeta = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Tarjeta`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getFormaDePagoTarjetaId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Tarjeta WHERE idTarjeta = ?`, [req.params.idTarjeta]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago de Tarjeta por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createFormaDePagoTarjeta = async (req, res) => {
    try {
        const { cantidadCuotas } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO Tarjeta (idTarjeta, cantidadCuotas) VALUES (?, ?)`, [req.params.idTarjeta, cantidadCuotas]);
        res.json({
            idTarjeta: req.params.idTarjeta,
            cantidadCuotas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteFormaDePagoTarjeta = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Tarjeta WHERE idTarjeta = ?`, [req.params.idTarjeta]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago por Tarjeta no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoTarjeta = async (req, res) => {
    try {
        const { cantidadCuotas } = req.body;
        const [result] = await pool.promise().query(`UPDATE Tarjeta SET cantidadCuotas = ? WHERE idTarjeta = ?`, [cantidadCuotas, req.params.idTarjeta]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago de Tarjeta por ese ID" });
        }
        res.json({
            idTarjeta: req.params.idTarjeta,
            cantidadCuotas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//CONTADO

export const getFormaDePagoContado = async (req, res) => {  
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Contado`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getFormaDePagoContadoId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Contado WHERE idContado = ?`, [req.params.idContado]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago al Contado por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createFormaDePagoContado = async (req, res) => {  
    try {
        const [result] = await pool.promise().query(`INSERT INTO Contado (idContado) VALUES (?)`, [req.params.idContado]);
        res.json({
            idContado: req.params.idContado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteFormaDePagoContado = async (req, res) => {   
    try {
        const [result] = await pool.promise().query(`DELETE FROM Contado WHERE idContado = ?`, [req.params.idContado]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago al Contado no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoContado = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`UPDATE Contado SET idContado = ? WHERE idContado = ?`, [req.params.idContado, req.params.idContado]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago al Contado por ese ID" });
        }
        res.json({
            idContado: req.params.idContado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//DEPOSITO

export const getFormaDePagoDeposito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Deposito`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}   

export const getFormaDePagoDepositoId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Deposito WHERE idDeposito = ?`, [req.params.idDeposito]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Pago por Deposito por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}   

export const createFormaDePagoDeposito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`INSERT INTO Deposito (idDeposito) VALUES (?)`, [req.params.idDeposito]);
        res.json({
            idDeposito: req.params.idDeposito
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteFormaDePagoDeposito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Deposito WHERE idDeposito = ?`, [req.params.idDeposito]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pago por Deposito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateFormaDePagoDeposito = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`UPDATE Deposito SET idDeposito = ? WHERE idDeposito = ?`, [req.params.idDeposito, req.params.idDeposito]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el Pago por Deposito por ese ID" });
        }
        res.json({
            idDeposito: req.params.idDeposito
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
