const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getTypes = (req, res) => {
  pool.query('SELECT * FROM ItemTypes', (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

module.exports = {
	getTypes,
}