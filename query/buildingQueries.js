const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const getBuildingFromID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * from Building_Contained WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0])
    })
};

const updateBuilding = (request, response) => {
    const id = parseInt(request.params.id);
    const {region, type} = request.body;

    pool.query('UPDATE Building_Contained SET Region = $1, Type = $2 WHERE id = $3',
        [region, type, id], (error, results) => {
            if (error) throw error;
            pool.query('SELECT * FROM Building_Contained WHERE ID = $1', [id], (error, results) => {
                if (error) throw error;
                response.status(200).json(results.rows[0])
            })
        }
    )
};

const createBuilding = (request, response) => {
    const {region, type} = request.body;
    getNextID('Building_Contained').then(function(id) {
        pool.query('INSERT INTO Building_Contained VALUES ($1, $2, $3)', [id, region, type], (error, results) => {
                if (error) throw error;
                pool.query(`SELECT * FROM Building_Contained WHERE ID=${id}`, (error, results) => {
                    if (error) throw error;
                    response.status(200).json(results.rows[0]);
                });
        })
    })
};

const deleteBuilding = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM Building_Contained WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Building deleted with ID: ${id}`)
    })
};

let getNextID = function(table) {
    return new Promise(function(resolve, reject) {
        try {
            pool.query(`SELECT max(id) FROM ${table}`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0].max + 1)
            })
        } catch (error) {
            console.error(error);
        }
    })
};

module.exports = {
    getBuildingFromID,
    createBuilding,
    updateBuilding,
    deleteBuilding
};
