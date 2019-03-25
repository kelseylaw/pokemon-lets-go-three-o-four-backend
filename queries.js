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

const getPokemonByID = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPokemon = (request, response) => {
  const {id, nickname, pokedexnum, status, battlesdone} = request.body

  pool.query('INSERT INTO pokemon VALUES ($1, $2, $3, $4, $5)', 
    [id, nickname, pokedexnum, status, battlesdone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Pokemon added with ID: ${id}`)
  })
}

const updatePokemon = (request, response) => {
  const id = parseInt(request.params.id)
  const {nickname, pokedexnum, status, battlesdone} = request.body

  pool.query(
    'UPDATE pokemon SET nickname = $1, pokedexnum = $2, status = $3, battlesdone = $4 WHERE id = $5',
    [nickname, pokedexnum, status, battlesdone, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deletePokemon = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Pokemon deleted with ID: ${id}`)
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
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getMapRegions,
  findMapRegion
}