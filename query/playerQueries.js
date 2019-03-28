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
    if (error) throw error;else if (results.rows.length < 1) {
      // please check formatting of message, and change to consistent formatting if wrong
      res.status(204).json({"Error": "Username and password combination did not match records."})
    }
    res.status(200).json(results.rows[0])
  })
}

const getUsers = (req, res) => {
  pool.query('SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID', (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows})
  })
}

const findUserByID = (req, res) => {
  const userID = parseInt(req.params.id);
  pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Characters.ID = ${userID}`, (error, results) => {
    if (error) throw error;
    else if (results.rows.length < 1) {
      res.status(204).json({"Error": "User could not be found!"});
    }
    res.status(200).json(results.rows[0]);
  })
}

const getPokemonsByUserID = (req, res) => {
  const ownerID = parseInt(req.params.id);
  pool.query(`SELECT Pokemon.ID, Species.Name, Pokemon.Nickname, Pokemon.PokeDexNum, Pokemon.Status, Pokemon.BattlesDone FROM Pokemon JOIN OwnedBy ON Pokemon.ID = OwnedBy.PokemonID JOIN Species ON Pokemon.PokeDexNum = Species.ID WHERE OwnedBy.OwnerID =  ${ownerID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getItemCount = (req, res) => {
  const playableID = parseInt(req.params.id);
  pool.query(`SELECT Type AS ItemType, COUNT(*) AS Quantity FROM Items WHERE PlayableID = ${playableID} AND Used = 0 GROUP BY Type`, (error, results) => {
    if (error) throw error
    res.status(200).json({"data": results.rows});
  })
}

const getBattlesByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM Battle WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getDistinctSpeciesCaughtByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT COUNT(*) AS SpeciesCaught FROM OwnedBy LEFT JOIN Pokemon ON OwnedBy.PokemonID = Pokemon.ID WHERE OwnedBy.OwnerID = ${userID} GROUP BY Pokemon.PokedexNum`, (error, results) => {
    if (error) throw error;
    else if (results.rows.length < 1) {
      res.status(204).json({"Error": "User could not be found!"});
    }
    res.status(200).json(results.rows[0]);
  })
}

const getBadgesByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM GymBadges_Received WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getHealRecordsByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM Heals WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getSellsRecordsByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM Sells WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getMoveAcrossRecordsByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM MoveAcross WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getCatchesRecordsByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM Catches WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getItemUseRecordsByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`SELECT * FROM Uses WHERE PlayableID = ${userID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getSpeciesPokemonsByUserID = (req, res) => {
  const ownerID = req.params.id;
  const speciesID = req.params.speciesid;
  pool.query(`SELECT Pokemon.ID, Pokemon.Nickname, Pokemon.PokeDexNum, Pokemon.Status, Pokemon.BattlesDone FROM Pokemon JOIN OwnedBy ON Pokemon.ID = OwnedBy.PokemonID WHERE OwnedBy.OwnerID = ${ownerID} AND Pokemon.PokedexNum = ${speciesID}`, (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const getNumberSpeciesCaughtByUserID = (req, res) => {
  const ownerID = req.params.id;
  pool.query(`SELECT COUNT(*) AS SpeciesCaught FROM Pokemon JOIN OwnedBy ON Pokemon.ID = OwnedBy.PokemonID WHERE OwnedBy.OwnerID = ${ownerID} GROUP BY Pokemon.PokedexNum`, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  })
}

const addNewUser = (req, res) => {
  const accountJSON = req.body;
  const name = accountJSON.characterName;
  const username = accountJSON.username;
  const password = accountJSON.password;
  const createdAt = new Date().toISOString();
  const badgesOwned = "badgesOwned" in accountJSON ? accountJSON.badgesOwned : 0;
  const balance = "balance" in accountJSON ? accountJSON.balance : 2000;
  const admin = "admin" in accountJSON ? accountJSON.admin : 0;

  getNextID('Characters').then(function(id) {
    pool.query(`INSERT INTO Characters VALUES(${id}, '${name}', 'Pallet Town')`, (error, results) => {
      if (error) res.status(400).json({"Error": "Unable to add new user to database. (Characters)"});
      else pool.query(`INSERT INTO Playable VALUES(${id}, '${username}', '${password}', TO_DATE('${createdAt}', 'YYYY-MM-DD'), ${badgesOwned}, ${balance}, ${admin})`, (error, results) => {
        if (error) res.status(400).json({"Error": "Unable to add new user to database. (Playable)"});
        else pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Characters.ID = ${id}`, (error, results) => {
          if (error) res.status(400).json({"Error": "Unable to find new user in database. (Characters)"});
          else res.status(201).json(results.rows[0]);
        })
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
  const haveBalance = "balance" in accountJSON;
  const haveBadgesOwned = "badgesowned" in accountJSON;

  pool.query(`UPDATE Characters SET Name = '${name}' WHERE ID = ${id}`, (error, results) => {
    if (error) throw error;
    let playableQuery = "";
    if (haveBalance && haveBadgesOwned) {
      playableQuery = `UPDATE Playable SET Username = '${username}', Password = '${password}', Balance = ${accountJSON.balance}, BadgesOwned = ${accountJSON.badgesowned} WHERE ID = ${id}`
    } else if (haveBalance) {
      playableQuery = `UPDATE Playable SET Username = '${username}', Password = '${password}', Balance = ${accountJSON.balance} WHERE ID = ${id}`
    } else if (haveBadgesOwned) {
      playableQuery = `UPDATE Playable SET Username = '${username}', Password = '${password}', BadgesOwned = ${accountJSON.badgesowned} WHERE ID = ${id}`
    } else {
      playableQuery = `UPDATE Playable SET Username = '${username}', Password = '${password}' WHERE ID = ${id}`
    }
    pool.query(playableQuery, (error, results) => {
      if (error) res.status(400).json({"Error": "Unable to edit user in database. (Playable)"});
      pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Characters.ID = ${id}`, (error, results) => {
        if (error) res.status(400).json({"Error": "Unable to find edited user in database. (Characters)"});
        res.status(200).json(results.rows[0]);
      })
    })
  })
}

const movePlayerLocationByID = (req, res) => {
  const accountJSON = req.body;
  const playableID = accountJSON.id;
  const locatedAt = accountJSON.locatedat;
  const happenedAt = new Date().toISOString();
  pool.query(`UPDATE Characters SET LocatedAt = '${locatedAt}' WHERE ID = ${playableID}`, (error, results) => {
    if (error) throw error;
    getNextID('MoveAcross').then(function(id) {
      pool.query(`INSERT INTO MoveAcross VALUES(${id}, ${playableID}, '${locatedAt}', TO_DATE('${happenedAt}', 'YYYY-MM-DD'))`, (error, results) => {
        if (error) throw error;
        pool.query(`SELECT * FROM Characters RIGHT JOIN Playable ON Characters.ID = Playable.ID WHERE Characters.ID = ${playableID}`, (error, results) => {
          if (error) throw error;
          res.status(200).json(results.rows[0]);
        })
      })
    })
  })
}

const deletePlayerByUserID = (req, res) => {
  const userID = req.params.id;
  pool.query(`DELETE FROM Characters WHERE ID = ${userID}`, (error, results) => {
    if (error) res.status(400).json({"Error": "Unable to delete user from database. (Characters)"});
    else res.status(200).send(`Character/Playable/Account was deleted with the ID ${userID}`);
  })
}

const getUsersWithAllItemType = (req, res) => {
  pool.query('select c.name from characters c where not exists ((select it.Type from ItemTypes it) except (select i.Type from Items i where i.PlayableID = c.id));', (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows})
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
  authenticateUser,
  getUsers,
  findUserByID,
  getPokemonsByUserID,
  getItemCount,
  getBattlesByUserID,
  getDistinctSpeciesCaughtByUserID,
  getBadgesByUserID,
  getHealRecordsByUserID,
  getSellsRecordsByUserID,
  getMoveAcrossRecordsByUserID,
  getItemUseRecordsByUserID,
  getCatchesRecordsByUserID,
  getSpeciesPokemonsByUserID,
  getNumberSpeciesCaughtByUserID,
  addNewUser,
  editUserByID,
  movePlayerLocationByID,
  deletePlayerByUserID,
  getUsersWithAllItemType
}