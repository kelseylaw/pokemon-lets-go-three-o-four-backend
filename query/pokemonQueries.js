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
  const {pokedexnum, nickname, ownerid} = request.body;

  getNextID('pokemon').then(function(id) {
    pool.query('INSERT INTO pokemon VALUES ($1, $2, $3, \'Healthy\', 0)', [id, nickname, pokedexnum], (error, results) => {
      if (error) {
        response.json({ error: `create pokemon with id=${id} failed!` });
        throw error;
      }
      pool.query(`INSERT INTO OwnedBy VALUES(${id}, ${ownerid})`, (error, results) => {
        if (error) throw error;
        pool.query(`SELECT * FROM pokemon WHERE ID = ${id}`, (error, results) => {
          if (error) throw error;
          response.status(200).json(results.rows[0])
        })
      })
    })
  });
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
      pool.query(`SELECT * FROM pokemon WHERE ID = ${id}`, (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows[0])
      })
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


let getNextID = function(table) {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`SELECT max(id) FROM ${table}`, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0].max + 1)
      })
    } catch (error) {
      console.error(error);
    }
  })
}

module.exports = {
  getPokemons,
  getPokemonsByUserID,
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon
}