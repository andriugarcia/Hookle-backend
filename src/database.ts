import * as dotenv from 'dotenv'
import neo4j from 'neo4j-driver'

dotenv.config({ path: __dirname + '/.env' })

// 'bolt://18.203.12.204', production
var driver = neo4j.driver(
    'bolt://54.155.11.125',
    neo4j.auth.basic(process.env.DATABASE_USER, process.env.DATABASE_PASS)
)

export default driver
