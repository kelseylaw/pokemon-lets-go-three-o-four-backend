const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addHealRecord = (request, response) => {
    const pokemonId = request.body.pokemonid;
    const buildingId = request.body.buildingid;
    const playableId = request.body.playableid;
    const date = new Date().toISOString();
    pool.query('INSERT INTO Heals VALUES ($1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))', [pokemonId, buildingId, playableId, date], (error, result) => {
        if (error) throw error;
        pool.query('SELECT * FROM Heals WHERE PokemonID = $1 AND BuildingID = $2 AND PlayableID = $3',
            [pokemonId, buildingId, playableId], (error, result) => {
            if (error) throw error;
            response.status(200).json(result.rows[0])
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
