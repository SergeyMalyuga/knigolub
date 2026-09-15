import mySql from 'mysql2/promise';
import dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config();

const pool = mySql.createPool(
    {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        waitForConnections: true,
        connectionLimit: 10
    }
)

export default pool;
