import mysql from 'mysql';

export const con = mysql.createConnection({
   host: "localhost",
   user: "yolausgg",
   password: "yolausgg",
   database: "prototipoecommerce"
});

