const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addCatchRecord = (require, response) => {
    const playerID = require.params.playableID;
    const pokeID = require.params.pokeID;
    const itemID = require.params.itemID;
    const date = new Date().toISOString();
    pool.query('INSERT INTO Catches VALUES ($1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))', [playerID, pokeID, itemID, date], (error, result) => {
        if (error) throw error;
        pool.query('SELECT * FROM Catches WHERE PlayableID = $1 AND PokeID = $2', [playerID, pokeID], (error, results) => {
            if (error) throw error;
            response.status(200).json(results.rows[0]);
        })
    })
};

const getAllRecords = (require, response) => {
    pool.query('SELECT * FROM Catches', (error, results) => {
        if (error) throw error;
        response.status(200).json({"data": results.rows});
    })
};

module.exports = {
    addCatchRecord,
    getAllRecords 
};
