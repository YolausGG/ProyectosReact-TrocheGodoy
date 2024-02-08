import { pool } from "../db.js"

//CALZADO
export const getCalzados = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Calzado")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}
export const getCalzado = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Calzado where idCalzado = ? ", [req.params.id]);
    try {
        if (result.length === 0)
            return res.status(404).json({ message: "No existe la Calzado" })

        res.json(
            result[0]
        )

    } catch (error) {
        console.error(error)
    }
};
export const createCalzado = async (req, res) => {

    const [result] = await pool.promise().query("insert into Calzado (idCalzado) values(?)", [req.params.id])
    try {
        console.log(result);
        res.json({
            idCalzado: result.insertId,
            nombre
        })
    } catch (error) {
        console.error(error)
    }

}
export const deleteCalzado = async (req, res) => {
    const [result] = await pool.promise().query("Delete from Calzado where idCalzado = ? ", [req.params.id]);
    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe el Calzado" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//VESTIMENTA
export const getVestimentas = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Vestimenta")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}
export const getVestimenta = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Vestimenta where idVestimenta = ? ", [req.params.id]);
    try {
        if (result.length === 0)
            return res.status(404).json({ message: "No existe la Vestimenta" })

        res.json(
            result[0]
        )

    } catch (error) {
        console.error(error)
    }
};
export const createVestimenta = async (req, res) => {

    const [result] = await pool.promise().query("insert into Vestimenta (idVestimenta) values(?)", [req.params.id])
    try {
        console.log(result);
        res.json({
            idVestimenta: result.insertId
        })
    } catch (error) {
        console.error(error)
    }

}
export const deleteVestimenta = async (req, res) => {
    const [result] = await pool.promise().query("Delete from Vestimenta where idVestimenta = ? ", [req.params.id]);
    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe la Vestimenta" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ACCESORIO
export const getAccesorios = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Accesorio")
    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}
export const getAccesorio = async (req, res) => {

    const [result] = await pool.promise().query("Select * from Accesorio where idAccesorio = ? ", [req.params.id]);
    try {
        if (result.length === 0)
            return res.status(404).json({ message: "No existe el Accesorio" })

        res.json(
            result[0]
        )

    } catch (error) {
        console.error(error)
    }
};
export const createAccesorio = async (req, res) => {
   
    const [result] = await pool.promise().query("Insert into Accesorio (idAccesorio) values(?)", [req.params.id])
    try {
        console.log(result);
        res.json({
            idAccesorio: result.insertId
        })
    } catch (error) {
        console.error(error)
    }

}
export const deleteAccesorio = async (req, res) => {
    const [result] = await pool.promise().query("Delete from Accesorio where idAccesorio = ? ", [req.params.id]);
    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe el Accesorio" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}