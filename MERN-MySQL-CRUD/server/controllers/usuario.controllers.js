import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Usuario where bajaLogica = 0`)

    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}

export const getUsuario = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Usuario where idUsuario = ?`, [req.params.id])

    try {
        if (result === 0)
            return res.status(404).json({ message: "No existe el Usuario" })

        res.json(
            result[0]
        )
    } catch (error) {
        console.error(error)
    }
}

export const getSesionUsuario = async (req, res) => {

    const { correo, userPassword } = req.body
    //console.log(req.body);

    const [result] = await pool.promise().query('Select * from Usuario where correo = ? and userPassword = ? and bajaLogica = 0', [correo, userPassword])
    //console.log(result);
    try {
        if (result.length > 0)
            res.json(1)
        else
            res.json(await getCorreoUsuario(correo))

    } catch (error) {
        console.error(error)
    }

}

const getCorreoUsuario = async (correo) => {

    const [result] = await pool.promise().query('Select * from Usuario where correo = ? and bajaLogica = 0', [correo])
    console.log('result correo');
    console.log(result);
    try {
        if (result.length > 0)
            return 2
        else
            return 3
    } catch (error) {
        console.error(error)
    }
}

export const createUsuario = async (req, res) => {

    console.log(req.body)
    const { correo, userPassword, nombre, apellido, fechaNacimiento, telefono, direccion } = req.body

    var txtFechaSeleccionada = fechaNacimiento.year + "-" +
        fechaNacimiento.mes + "-" +
        fechaNacimiento.dia

    const [result] = await pool.promise().query("Insert into Usuario (correo, userPassword, nombre, apellido, fechaNacimiento, telefono, direccion) " +
        "values (?,?,?,?,?,?,?)", [correo, userPassword, nombre, apellido, txtFechaSeleccionada, telefono, direccion])

    try {
        console.log(result)
        res.json({
            idUsuario: result.insertId,
            correo,
            userPassword,
            nombre, apellido,
            fechaNacimiento,
            telefono,
            direccion
        })

    } catch (error) {
        console.error(error)
    }
}

export const updatePassword = async (req, res) => {

    const { password } = req.body

    const [result] = await pool.promise().query("Update Usuario set userPassword = ? where idUsuario = ?", [password, req.params.id])

    try {
        console.log(result)
        if (result.changedRows === 0)
            return res.status(404).json({ message: "No existe la Usuario" })


        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }

}

export const bajaUsuario = async (req, res) => {

    const [result] = await pool.promise().query("Update Usuario set bajaLogica = 1 where idUsuario = ? ", [req.params.id]);
    try {
        if (result.changedRows === 0)
            return res.status(404).json({ message: "No existe la Usuario" })


        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}