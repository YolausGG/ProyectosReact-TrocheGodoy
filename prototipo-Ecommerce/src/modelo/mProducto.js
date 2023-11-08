// Persistencia de Productos
import { con } from './useConexionDB.js'


export function altaProducto() {

    con.connect(function (err) {
        if (err) throw err;

        con.query("SELECT * FROM Categoria", function (err, result) {
            if (err) throw err;
            console.log('Conexion exitosa!!');
            console.log(result);
            console.log(result.length);
        });
        con.end();
    });

}