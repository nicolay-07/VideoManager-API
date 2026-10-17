import 'dotenv/config'
import postgres from 'postgres'

const URL = process.env.DATABASE_URL

const sql = postgres(URL, { ssl: 'require' })

export default sql