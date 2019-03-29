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
    res.status(200).json({"data": results.rows})
  })
}

const getPokemonByID = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM pokemon WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    response.status(200).json({"data": results.rows})
  })
}

const createPokemon = (request, response) => {
  // const {pokedexnum, nickname, ownerid} = request.body;
  const pokemonJSON = request.body;
  const dexNum = pokemonJSON.dexNum;
  const nickname = "nickname" in pokemonJSON ? pokemonJSON.nickname : null;
  const ownerId = pokemonJSON.ownerId;

  getNextID('pokemon').then(function(id) {
    pool.query('INSERT INTO pokemon VALUES ($1, $2, $3, \'Healthy\', 0)', [id, nickname, dexNum], (error, results) => {
      if (error) response.status(400).json({"Error": "Unable to add new pokemon to database. (Pokemon)"});
      else pool.query(`INSERT INTO OwnedBy VALUES(${id}, ${ownerId})`, (error, results) => {
        if (error) response.status(400).json({"Error": "Unable to add new pokemon to database. (OwnedBy)"});
          pool.query(`SELECT Pokemon.*, Species.name FROM Pokemon JOIN Species ON Pokemon.PokeDexNum = Species.ID WHERE Pokemon.ID = ${id}`, (error, results) => {
          if (error) response.status(400).json({"Error": "Unable to find new pokemon in database. (Pokemon)"});
          else response.status(200).json(results.rows[0]);
        })
      })
    })
  });
}

const updatePokemon = (request, response) => {
  const id = parseInt(request.params.id)
  const status = request.body.status;

  pool.query(
    'UPDATE pokemon SET status = $1 WHERE id = $2',
    [status, id],
    (error, results) => {
      if (error) response.status(400).json({"Error": "Unable to update Pokemon in database. (Pokemon)"});
      else pool.query(`SELECT * FROM pokemon WHERE ID = ${id}`, (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows[0])
      })
    }
  )
}

const deletePokemon = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM pokemon WHERE id = $1', [id], (error, results) => {
    if (error) response.status(400).json({"Error": "Unable to delete pokemon from database. (Pokemon)"});
    response.status(200).send(`Pokemon deleted with ID: ${id}`)
  })
}

const countPokemonBySpecies = (req, res) => {
  const species = req.params.speciesid;

  pool.query(`SELECT count(*) FROM pokemon group by pokedexnum having pokedexnum = ${species}`, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0].count)
  })
}

let getNextID = function(table) {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`SELECT max(id) FROM ${table}`, (error, results) => {
        if (error) reject(error);
        resolve(results.rows[0].max + 1)
      })
    } catch (error) {
      console.error(error);
    }
  })
}

module.exports = {
  getPokemons,
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon,
  countPokemonBySpecies,
}