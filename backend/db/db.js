import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'smitter_test'
});

export const query = async (text, params, callback) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.log("Error in query", {text});
        throw error;
    }
};

