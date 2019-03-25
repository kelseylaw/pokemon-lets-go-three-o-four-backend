const Pool = require('pg').Pool
const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getPokemons = (request, response) => {
  pool.query('select * from pokemon', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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

module.exports = {
  getPokemons,
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon,
}