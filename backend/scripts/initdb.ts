import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the root of the backend
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('❌ DATABASE_URL not found in .env');
    process.exit(1);
}

// Regex to parse: postgresql://user:password@host:port/dbname
const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
if (!match) {
    console.error('❌ Invalid DATABASE_URL format. Expected: postgresql://user:password@host:port/dbname');
    process.exit(1);
}

const [_, user, password, host, port, dbName] = match;

// Use 'postgres' as the maintenance database to create the target DB
const adminConnectionString = `postgresql://${user}:${password}@${host}:${port}/postgres`;

async function ensureDbExists() {
    console.log(`🔍 Checking if database "${dbName}" exists on ${host}:${port}...`);

    const client = new Client({
        connectionString: adminConnectionString,
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();

        // Check if the database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rowCount === 0) {
            console.log(`✨ Database "${dbName}" does not exist. Creating it...`);
            // We must avoid parameter binding for CREATE DATABASE as it's a DDL statement that doesn't support it in all clients
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`✅ Database "${dbName}" created successfully.`);
        } else {
            console.log(`✅ Database "${dbName}" already exists.`);
        }
    } catch (err: any) {
        if (err.code === 'ECONNREFUSED' || err.code === '57P03') {
            console.error(`\n❌ Could not connect to Postgres at ${host}:${port}.`);
            console.error(`   Is the Docker container running?`);
            console.error(`   If you are running locally, make sure ports are exposed in docker-compose.yml.\n`);
        } else {
            console.error('❌ Error during database initialization:', err.message);
        }
        process.exit(1);
    } finally {
        await client.end();
    }
}

ensureDbExists().catch(err => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
});
