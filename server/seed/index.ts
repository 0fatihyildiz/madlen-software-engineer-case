import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const sqlFilePath = path.join(__dirname, 'sql_file.sql');

const sqlCode = fs.readFileSync(sqlFilePath, 'utf-8');

async function executeSQL() {
    const client = new Client({
        connectionString,
    });

    try {
        await client.connect();
        console.log("Connected to the database");

        const res = await client.query(sqlCode);
        console.log('SQL executed successfully:', res);
    } catch (err) {
        console.error('Error executing SQL:', err);
    } finally {
        await client.end();
        console.log("Disconnected from the database");
    }
}

executeSQL();
