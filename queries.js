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
  // const {id, nickname, pokedexnum, status, battlesdone} = request.body
  // console.log(request.body.nickname);
  const {pokedexnum, nickname, ownerID} = request.body;
  // console.log(await getNextID('pokemon'));
  getNextID('pokemon', function(err, rows) {
    id = rows[0].max + 1;
    console.log('back here')
  console.log(id)

  pool.query('INSERT INTO pokemon VALUES ($1, $2, $3, \'Healthy\', 0)', 
    [id, nickname, pokedexnum], (error, results) => {
    if (error) {
      response.json({ error: `create pokemon with id=${id} failed!` });
      throw error;
    }
    // response.status(201).send(`Pokemon added with ID: ${id}`)
    response.status(201).json(request.body);
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

function getNextID(table, callback) {
  console.log(table);
  console.log('testststs');
  const temp = table;

  pool.query(`SELECT max(id) FROM ${temp}`, (error, results) => {
    if (error) {
      throw callback(error, null);
    }
    console.log('beep');
    console.log(results.rows[0].max + 1);
    return callback(null, results.rows);
  })
}

module.exports = {
  getPokemons,
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon,
}