import { pool } from "../db.js";

export const getProductos = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Producto`)

    try {
        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const getProductosCategorias = async (req, res) => {

    const idCategorias = req.params.idCategorias
    let textCategorias = ""

    if (idCategorias.length == 1) {
        textCategorias = `${idCategorias[0]}`
    } else {

        for (let i = 0; i < idCategorias.length; i++) {
            textCategorias = `${idCategorias[i]} and `;
            if (i == idCategorias.length - 1) {
                `${idCategorias[i]}`
            }
        }
    }

    const [result] = await pool.promise().query(`select * 
    from Producto P inner join ProductoCategoria PC on P.idProducto = PC.idProducto
    inner join Categoria C on PC.idCategoria = C.idCategoria 
    where C.idCategoria = ? `, [textCategorias])

    try {
        if (result === 0)
            return res.status(404).json({ message: "No existen Productos con esas Categorias" })

        res.json(
            result
        )

    } catch (error) {
        console.error(error)
    }
}

export const getProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Producto where idProducto = ?`, [req.params.idProducto])

    try {
        if (result === 0)
            return res.status(404).json({ message: "No existe el Producto" })

        res.json(
            result[0]
        )
    } catch (error) {
        console.error(error)
    }
}

export const getProductoNombre = async (req, res) => {

    const [result] = await pool.promise().query(`Select * from Producto where nombre = ?`, [req.params.nombre])

    try {
        if (result === 0)
            return res.status(404).json({ message: "No existe el Producto" })

        res.json(
            result[0]
        )
    } catch (error) {
        console.error(error)
    }
}

export const createProducto = async (req, res) => {

    const { nombre, precio, descripcion } = req.body

    const [result] = await pool.promise().query(`Insert into Producto (nombre, precio, descripcion)
        values(?,?,?)`, [nombre, precio, descripcion])

    try {
        console.log(result)
        res.json({
            idProducto: result.insertId,
            nombre,
            precio,
            descripcion
        })
    } catch (error) {
        console.error(error)
    }
}

export const deleteProducto = async (req, res) => {

    const [result] = await pool.promise().query(`Delete from Producto where idProducto = ?`, [req.params.idProducto])

    try {
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No existe el Producto" })

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateProducto = async (req, res) => {

    const { nombre, precio, descripcion, idProducto } = req.body

    const [result] = await pool.promise().query(`Update Producto set nombre = ?, precio = ?, descripcion = ? 
        where idProducto = ?`, [nombre, precio, descripcion, idProducto])

    try {
        res.json({
            result
        })
    } catch (error) {
        console.error(error)
    }
}


