const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getSpecies = (req, res) => {
  pool.query('SELECT * FROM Species', (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

module.exports = {
	getSpecies,
}