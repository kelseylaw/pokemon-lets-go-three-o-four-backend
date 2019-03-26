const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getItemTypes = (req, res) => {
  pool.query('SELECT * FROM ItemTypes', (error, results) => {
    if (error) throw error
    res.status(200).json({ "data": results.rows });
  })
}

const updateItemTypeCost = (req, res) => {
	const type = req.params.type;
  	const {cost} = req.body;

  	pool.query(
  		`UPDATE itemtypes SET cost=${cost} where type='${type}'`, (error, results) => {
  			if (error) { throw error }
  			pool.query(`SELECT * FROM ItemTypes where type='${type}'`, (error, results) => {
        		if (error) throw error;
        		res.status(200).json(results.rows[0])
     	 	})
  		})
}

const deleteItemType = (req, res) => {
	const type = req.params.type;

	pool.query(`DELETE FROM ItemTypes WHERE type = '${type}'`, (error, results) => {
    	if (error) throw error;
    	res.status(200).send(`Itemtype deleted with Type: '${type}'`)
  	})
}

module.exports = {
  getItemTypes,
  updateItemTypeCost,
  deleteItemType,
}