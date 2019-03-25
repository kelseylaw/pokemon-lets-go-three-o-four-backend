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

// items
const getItemById = (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * from Items WHERE id = $1',[id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getItemsFromPlayable = (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * from Items WHERE PlayableID = $1',[id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createItem = (request, response) => {
  const {id, type, playableID, used} = request.body;
  pool.query('INSERT INTO Items VALUES ($1, $2, $3, $4)',
      [id, type, playableID, used], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Item added with ID: ${id}`)
  })
};

const updateItem = (request, response) => {
  const id = parseInt(request.params.id);
  const {type, playableID, used} = request.body;

  pool.query(
      'UPDATE Items SET role = $1, reward = $2, used = $3 WHERE id = $4',
      [type, playableID, used, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Item modified with ID: ${id}`)
      }
  )
};

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM Items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Item deleted with ID: ${id}`)
  })
};

// nonPlayable
const getNPC = (request, response) => {
  pool.query('SELECT * from nonPlayable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getNPCByID = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * from nonPlayable WHERE id = $1',[id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const createNPC = (req, res) => {
  const {id, role, reward} = req.body;
  pool.query('INSERT INTO nonPlayable VALUES ($1, $2, $3)',
      [id, role, reward], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`NonPlayable added with ID: ${id}`)
  })
};

const updateNPC = (request, response) => {
  const id = parseInt(request.params.id);
  const {role, reward} = request.body;

  pool.query(
      'UPDATE nonPlayable SET role = $1, reward = $2 WHERE id = $3',
      [role, reward, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
  )
};

const deleteNPC = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM nonPlayable WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Pokemon deleted with ID: ${id}`)
  })
};

module.exports = {
  getPokemons,
  getPokemonByID,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getItemById,
  getItemsFromPlayable,
  createItem,
  updateItem,
  deleteItem,
  getNPC,
  getNPCByID,
  createNPC,
  updateNPC,
  deleteNPC,
}
