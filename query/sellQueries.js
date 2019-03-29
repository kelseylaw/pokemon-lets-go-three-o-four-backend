const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const allSellRecords = (request, response) => {
    pool.query('SELECT * FROM Sells', (error, results) => {
        if (error) throw error;
        response.status(200).json({"data": results.rows});
    })
};

const addSellRecord = (request, response) => {
    const itemId = request.body.itemid;
    const buildingId = request.body.buildingid;
    const playableId = request.body.playableid;
    const date = new Date().toISOString();
    getNextID('Sells').then(function(id) {
        pool.query('INSERT INTO Sells VALUES ($1, $2, $3, $4, TO_DATE($5, \'YYYY-MM-DD\'))', [id, itemId, buildingId, playableId, date], (error, result) => {
            response.status(200).json(result.rows[0]);
        })
    })
};

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
};

module.exports = {
    allSellRecords,
    addSellRecord
};
