import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/ping", async (req, res) => {

    await pool.promise().query("select * from categoria")
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows)
        })
        .catch(console.log)


})
export default router