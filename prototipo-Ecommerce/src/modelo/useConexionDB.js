import mysql from 'mysql';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "conexionautomotora"
   });
   
   con.connect( function(err) {
    if (err) throw err;

    console.log('Conexion exitosa!!');

    /*con.query("SELECT * FROM mecanicos", function (err, result) {
       if (err) throw err;
       console.log('Conexion exitosa!!');
       console.log(result);
       console.log(result.length);       
    });*/
    con.end();
   });