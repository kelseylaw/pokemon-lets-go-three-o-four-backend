const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getPokemons = (req, res) => {
  pool.query('SELECT * FROM Pokemon', (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getPokemonsByUserID = (req, res) => {
  const ownerID = parseInt(req.params.id);
  pool.query(`SELECT Pokemon.ID, Pokemon.Nickname, Pokemon.PokeDexNum, Pokemon.Status, Pokemon.BattlesDone FROM Pokemon JOIN OwnedBy ON Pokemon.ID = OwnedBy.PokemonID WHERE OwnedBy.OwnerID =  ${ownerID}`, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getMapRegions = (req, res) => {
  pool.query('SELECT * FROM MapRegions', (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const findMapRegion = (req, res) => {
  const mapRegionName = req.params.name;
  pool.query(`SELECT * FROM MapRegions WHERE Name = '${mapRegionName}'`, (error, results) => {
    if (error) throw error;
    else if (results.rows.length < 1) {
      // please check formatting of message, and change to consistent formatting if wrong
      res.status(204).json({"Error": "Map region could not be found!"})
    }
    res.status(200).json(results.rows[0])
  })
}

module.exports = {
  getPokemons,
  getPokemonsByUserID,
  getMapRegions,
  findMapRegion
}