import sql from "./db.js"

async function dropTable() {
    try {
        await sql`DROP TABLE IF EXISTS vehicles`
        console.log("Table 'vehicles' dropped successfully.")
    } catch (error) {
        console.error("Error dropping table:", error)
    }
}

dropTable()