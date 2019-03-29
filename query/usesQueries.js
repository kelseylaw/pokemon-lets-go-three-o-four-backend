const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addUsesRecord = (require, response) => {
    const playableId = require.body.playableid;
    const pokemonId = require.body.pokemonid;
    const itemId = require.body.itemid;
    const date = new Date().toISOString();
    pool.query('INSERT INTO Uses VALUES ($1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))', [playableId, pokemonId, itemId, date], (error, result) => {
        if (error) throw error;
        pool.query('SELECT * FROM Uses WHERE PlayableID = $1 AND PokemonID = $2 AND ItemID = $3', [playableId, pokemonId, itemId], (error, results) => {
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
