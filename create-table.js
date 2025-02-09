import sql from "./db.js"

async function createTable() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS vehicles (
                id TEXT PRIMARY KEY,
                placa TEXT,
                chassi TEXT,
                renavam TEXT,
                modelo TEXT,
                marca TEXT,
                ano INTEGER
            );
        `
        console.log("Table 'vehicles' created successfully.")
    } catch (error) {
        console.error("Error creating table:", error)
    }
}

createTable()

