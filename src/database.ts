import * as dotenv from 'dotenv'
import neo4j from 'neo4j-driver'

dotenv.config({ path: __dirname + '/.env' })

// 'bolt://18.203.12.204', production
var driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic(process.env.DATABASE_USER, process.env.DATABASE_PASS)
)

export default driver
