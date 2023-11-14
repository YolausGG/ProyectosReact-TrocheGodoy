import { createPool } from 'mysql2'

export const pool = createPool({
    host: "localhost",
    user: "yolausgg",
    password: "yolausgg",
    database: "prototipoecommerce"
})
console.log("111")
