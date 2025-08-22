import { pool } from "../db.js";

// ENVIO

export const getEnvios = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Envio`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getEnvioId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Envio WHERE idEnvio = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el Envio por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getEnviosIdDireccion = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Envio WHERE idDireccion = ?`, [req.params.idDireccion]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existen Envios por esa ID de Direccion" });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createEnvio = async (req, res) => {
    try {
        const { idOrden, idDireccion, fecha, tipo, estado, monto} = req.body;
        const [result] = await pool.promise().query(`INSERT INTO Envio (idOrden, idDireccion, fecha, tipo, estado, monto) VALUES (?, ?, ?, ?, ?, ?)`, [idOrden, idDireccion, fecha, tipo, estado, monto]);
        res.json({
            idEnvio: result.insertId,
            idOrden, 
            idDireccion, 
            fecha, 
            tipo, 
            estado, 
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteEnvio = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Envio WHERE idEnvio = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Envio no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateEnvio = async (req, res) => {
    try {
        const { idOrden, idDireccion, fecha, tipo, estado, monto} = req.body;
        const [result] = await pool.promise().query(`UPDATE Envio SET idOrden = ?, idDireccion = ?, fecha = ?, tipo = ?, estado = ?, monto = ? WHERE idEnvio = ?`, [idOrden, idDireccion, fecha, tipo, estado, monto, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Envio no encontrado' });
        }
        res.json({
            idEnvio: req.params.id,
            idOrden, 
            idDireccion, 
            fecha, 
            tipo, 
            estado, 
            monto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}