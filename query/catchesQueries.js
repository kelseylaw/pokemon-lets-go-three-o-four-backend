const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addCatchRecord = (require, response) => {
    const playableId = require.body.playableid;
    const pokemonId = require.body.pokemonid;
    const itemId = require.body.itemid;
    const date = new Date().toISOString();
    getNextID('Catches').then(function (id) {
        pool.query(`INSERT INTO Catches VALUES (${id}, $1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))`, [playableId, pokemonId, itemId, date], (error, result) => {
            if (error) throw error;
            pool.query('SELECT * FROM Catches WHERE PlayableID = $1 AND PokemonID = $2', [playableId, pokemonId], (error, results) => {
                if (error) throw error;
                response.status(200).json(results.rows[0]);
            })
        })
    })
};

const getAllRecords = (require, response) => {
    pool.query('SELECT * FROM Catches', (error, results) => {
        if (error) throw error;
        response.status(200).json({"data": results.rows});
    })
};

let getNextID = function (table) {
    return new Promise(function (resolve, reject) {
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
    addCatchRecord,
    getAllRecords 
};
