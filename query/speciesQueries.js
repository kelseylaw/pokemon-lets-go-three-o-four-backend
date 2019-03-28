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
    res.status(200).json({"data": results.rows})
  })
}

const getSpeciesID = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM species WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({"data": results.rows})
  })
}

const getSpeciesCond = (req, res) => {
  pool.query(condBuilder('species', '*', req.query), (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({"data": results.rows})
  })
}

const getSpeciesProjCond = (req, res) => {
  const proj = req.params.proj
  pool.query(condBuilder('species', proj, req.query), (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({"data": results.rows})
  })
}

// to build a sql query table is which table you are selecting form 
// json is the req.query you got from endpoint
// usage example see getSpeciesFoundAt
function condBuilder(table, proj, json) {
  let length = parseInt(Object.keys(json).length);
  const keys =  Object.keys(json);
  const values = Object.values(json);
  let counter = 0;
  let query = `SELECT ${proj} from ${table} WHERE ${keys[counter]} = '${values[counter]}'`;
  counter++;
  length--;
  while (length !== 0) {
    query = query + ` AND ${keys[counter]} = '${values[counter]}'`;
    counter++;
    length--;
  }
  return query;
}

module.exports = {
	getSpecies,
  getSpeciesID,
  getSpeciesCond,
  getSpeciesProjCond,
}