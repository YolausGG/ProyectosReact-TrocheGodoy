import { pool } from "../db.js"

export const getCategorias = async (req, res) => {

    await pool.promise().query("Select * from Categoria ")
        .then(([rows]) => {
            console.log(rows);

            res.json({
                rows
            })
        })
        .catch(console.log)
}
export const getCategoria = (req, res) => {
    res.send('Obteniendo Categoria')
}
export const createCategoria = async (req, res) => {

    console.log(req.body)
    const { nombre } = req.body;
    await pool.promise().query("insert into Categoria (nombre) values(?)", [nombre])
        .then(([rows]) => {
            console.log(rows);
            res.json({
                id: rows.insertId,
                nombre
            })
            res.send('Creando Categoria')
        })
        .catch(console.log)
}
export const updateCategoria = (req, res) => {
    res.send('Actualizando  Categoria')
}
export const deleteCategoria = (req, res) => {
    res.send('Eliminando  Categoria')
}
