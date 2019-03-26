const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addUsesRecord = (require, response) => {
    const playerID = require.params.playableID;
    const pokeID = require.params.pokeID;
    const itemID = require.params.itemID;
    const date = new Date().toISOString().substr(0,10);
    pool.query('INSERT INTO Uses VALUES ($1, $2, $3, $4)', [playerID, pokeID, itemID, date], (error, result) => {
        if (error) throw error;
        pool.query('SELECT * FROM Uses WHERE PlayableID = $1 AND PokeID = $2 AND ItemID = $3', [playerID, pokeID, itemID], (error, results) => {
            if (error) throw error;
            response.status(200).json(results.rows[0]);
        })
    })
};

const getUsesRecords = (require, response) => {
    pool.query('SELECT * FROM Uses', (error, results) => {
        if (error) throw error;
        response.status(200).json({"data": results.rows});
    })
};

module.exports = {
    addUsesRecord,
    getUsesRecords
};
