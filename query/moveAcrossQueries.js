const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const getMoveAcrossRecords = (request, response) => {
    pool.query('SELECT * FROM MoveAcross', (error, results) => {
        if (error) throw error;
        response.status(200).json({ "data": results.rows });
    })
};

const addMoveAcross = (request, response) => {
    const playerid = request.body.playableid;
    const mapname = request.body.mapname;
    const date = new Date().toISOString();
    getNextID('MoveAcross').then(function (id) {
        pool.query('INSERT INTO MoveAcross VALUES ($1, $2, $3, TO_DATE($4, \'YYYY-MM-DD\'))', [id, playerid, mapname, date], (error, result) => {
            if (error) throw error;
            pool.query('SELECT * FROM MoveAcross WHERE ID = $1', [id], (error, result) => {
                if (error) throw error;
                response.status(200).json(result.rows[0])
            })
        })
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
    getMoveAcrossRecords,
    addMoveAcross,
};
