import "dotenv/config"
import postgres from "postgres"

const sql = postgres(process.env.DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false
    }
})

export default sql