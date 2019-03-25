const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const authenticateUser = (req, res) => {
  const usernamePasswordJSON = req.body;
  const username = usernamePasswordJSON.username;
  const password = usernamePasswordJSON.password;
  pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Playable.Username = '${username}' AND Playable.Password = '${password}'`, (error, results) => {
    if (error) {
      throw error
    } else if (results.rows.length < 1) {
      // please check formatting of message, and change to consistent formatting if wrong
      res.status(204).json({"Error": "Username and password combination did not match records."})
    }
    res.status(200).json(results.rows[0])
  })
}

const getUsers = (req, res) => {
  pool.query('SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const findUserByID = (req, res) => {
  const userID = parseInt(req.params.id);
  pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Characters.ID = ${userID}`, (error, results) => {
    if (error) {
      throw error
    } else if (results.rows.length < 1) {
      // please check formatting of message, and change to consistent formatting if wrong
      res.status(204).json({"Error": "User could not be found!"})
    }
    res.status(200).json(results.rows[0])
  })
}

const addNewUser = (req, res) => {
  const accountJSON = req.body;
  const date = new Date();
  const id = 0;
  const name = accountJSON.characterName;
  const username = accountJSON.username;
  const password = accountJSON.password;
  const createdAt = `${date.getFullYear}-${date.getMonth}-${date.getDay}`
  const badgesOwned = accountJSON.badgesOwned;
  const balance = accountJSON.balance;
  const admin = accountJSON.admin;

  pool.query(`INSERT INTO Characters VALUES(${id}, '${name}', 'Pallet Town')`, (error, results) => {
    if (error) throw error;
    pool.query(`INSERT INTO Playable VALUES(${id}, '${username}', '${password}', TO_DATE('${createdAt}', 'YYYY-MM-DD'), ${badgesOwned}, ${balance}, ${admin})`, (error, results) => {
      if (error) throw error;
      pool.query(`SELECT * FROM Playable WHERE ID = ${id}`, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0])
      })
    })
  })
}

const editUserByID = (req, res) => {
  const accountJSON = req.body;
  const id = accountJSON.id;
  const name = accountJSON.characterName;
  const username = accountJSON.username;
  const password = accountJSON.password;

  pool.query(`UPDATE Characters SET Name = '${name}' WHERE ID = ${id}`, (error, results) => {
    if (error) throw error;
    pool.query(`UPDATE Playable SET Username = '${username}', Password = '${password}' WHERE ID = ${id}`, (error, results) => {
      if (error) throw error;
      pool.query(`SELECT * FROM Playable WHERE ID = ${id}`, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0])
      })
    })
  })
}

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

module.exports = {
  getUsers,
  findUserByID,
  authenticateUser,
  addNewUser,
  editUserByID,
  getPokemons,
  getPokemonsByUserID
}