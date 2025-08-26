import { pool } from "../db.js";

// DIRECCION

export const getDireccion = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Direccion`);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getDireccionId = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Direccion WHERE idDireccion = ?`, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe la Direccion por ese ID" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getDireccionesIdUsuario = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`SELECT * FROM Direccion WHERE idUsuario = ?`, [req.params.idUsuario]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existen Direcciones con esa ID de Usuario" });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createDireccion = async (req, res) => {
    try {
        const { idUsuario, calle, departamento, ciudad, numeroDeCasa, numeroDeApartamento, referencia, codigoPostal } = req.body;
        const [result] = await pool.promise().query(`INSERT INTO Direccion (idUsuario, calle, departamento, ciudad, numeroDeCasa, numeroDeApartamento, referencia, codigoPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [idUsuario, calle, departamento, ciudad, numeroDeCasa, numeroDeApartamento, referencia, codigoPostal]);
        res.json({
            idDireccion: result.insertId,
            idUsuario,
            calle,
            departamento,
            ciudad,
            numeroDeCasa,
            numeroDeApartamento,
            referencia,
            codigoPostal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteDireccion = async (req, res) => {
    try {
        const [result] = await pool.promise().query(`DELETE FROM Direccion WHERE idDireccion = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Direccion no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}