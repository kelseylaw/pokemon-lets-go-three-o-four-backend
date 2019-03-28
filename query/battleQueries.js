const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getBattles = (req, res) => {
  pool.query('SELECT * FROM Battle', (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
};

const getBattleFromID = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Battle WHERE ID = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  })
};

const addBattle = (req, res) => {
  const date = new Date().toISOString();
  const playerID = req.params.playerID;
  const npcID = req.params.npcID;
  getNextID('Battle').then(function (id) {
    pool.query('INSERT INTO Battle VALUES ($1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))', [id, playerID, npcID, date], (error, results) => {
      if (error) throw error;
      pool.query('SELECT * FROM Battle WHERE ID = $1', [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0]);
      })
    })
  })
};

const deleteBattle = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM Battle WHERE ID = $1', [id], (error, result) => {
    if (error) throw error;
    res.status(200).send(`Battle deleted with ID: ${id}`);
  })
};

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
};

module.exports = {
  getBattles,
  getBattleFromID,
  addBattle,
  deleteBattle
}
