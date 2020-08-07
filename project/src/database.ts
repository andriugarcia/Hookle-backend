import * as dotenv from 'dotenv'
import neo4j from 'neo4j-driver'

dotenv.config({ path: __dirname + '/.env' })

var driver = neo4j.driver(
    'bolt://18.203.12.204',
    neo4j.auth.basic(process.env.DATABASE_USER, process.env.DATABASE_PASS)
)

export default driver
