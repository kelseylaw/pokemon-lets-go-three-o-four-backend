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
}

const getBattleFromID = (req, res) => {
  const playerID = req.params.playerID;
  const npcID = req.params.npcID;
  pool.query('SELECT * FROM Battle WHERE PlayableID = $1 AND NonPlayableID = $2', [playerID, npcID], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  })
};

const addBattle = (req, res) => {
  const date = new Date().toISOString();
  const playerID = req.params.playerID;
  const npcID = req.params.npcID;
  pool.query('INSERT INTO Battle VALUES ($1, $2, $3)', [playerID, npcID, date], (error, results) => {
    if (error) throw error;
    pool.query('SELECT * FROM Battle WHERE PlayableID = $1 AND NonPlayableID = $2', [playerID, npcID], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows[0]);
    })
  })
};

const deleteBattle = (req, res) => {
  const playerID = parseInt(req.params.playerID);
  const npcID = parseInt(req.params.npcID);
  pool.query('DELETE FROM Battle WHERE PlayableID = $1 AND NonPlayableID = $2', [playerID, npcID], (error, result) => {
    if (error) throw error;
    res.status(200).send(`Battle deleted with PlayableID: ${playerID} and NonPlayableID: ${npcID}`);
  })
};

module.exports = {
  getBattles,
  getBattleFromID,
  addBattle,
  deleteBattle
}
