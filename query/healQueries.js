const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addHealRecord = (request, response) => {
    const pokeID = request.params.pokemonID;
    const buildingID = request.params.buildingID;
    const playerID = request.params.playableID;
    const date = new Date().toISOString().substr(0,10);
    pool.query('INSERT INTO Heals VALUES ($1, $2, $3, $4)', [pokeID, buildingID, playerID, date], (error, result) => {
        if (error) throw error;
        pool.query('SELECT * FROM Heals WHERE PokemonID = $1 AND BuildingID = $2 AND PlayableID = $3',
            [pokeID, buildingID, playerID], (error, result) => {
            if (error) throw error;
            response.status(200).json(results.rows[0])
            })
    })
};

const getAllHealRecords = (request, response) => {
    pool.query('SELECT * FROM Heals', (error, result) => {
        if (error) throw error;
        response.status(200).json({"data": result.rows});
    })
};

module.exports = {
    addHealRecord,
    getAllHealRecords
};
