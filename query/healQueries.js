const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const addHealRecord = (request, response) => {
    const buildingId = request.body.buildingid;
    const playableId = request.body.playableid;
    const date = new Date().toISOString();
    getNextID('Heals').then(function (id) {
        pool.query(`INSERT INTO Heals VALUES (${id}, $1, $2, TO_DATE($3, \'YYYY-MM-DD\'))`, [buildingId, playableId, date], (error, result) => {
            if (error) throw error;
            pool.query(`SELECT * FROM Heals WHERE id = ${id}`, (error, result) => {
                if (error) throw error;
                response.status(200).json(result.rows[0])
            })
        })
    })
};

const getAllHealRecords = (request, response) => {
    pool.query('SELECT * FROM Heals', (error, result) => {
        if (error) throw error;
        response.status(200).json({"data": result.rows});
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
    addHealRecord,
    getAllHealRecords
};
