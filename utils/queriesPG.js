const { Pool } = require('pg');
const pool = new Pool()
await pool.connect()

const res = await pool.query() /*is this supposed to be async??*/
await client.end()