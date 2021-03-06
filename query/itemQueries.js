const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const createItem = (request, response) => {
    const body = request.body;
    const type = body.type;
    const playableID = body.playableId;
    getNextID('Items').then(function(id) {
        pool.query('INSERT INTO Items VALUES ($1, $2, $3, 0)',
            [id, type, playableID], (error, results) => {
                if (error) response.status(400).json({"Error": "Unable to add new item to database. (Items)"});
                else pool.query(`SELECT * FROM Items WHERE ID = ${id}`, (error, results) => {
                    if (error) response.status(400).json({"Error": "Unable to find new item in database. (Items)"});
                    else response.status(200).json(results.rows[0]);
                });
        })
    })
};

const useItem = (request, response) => {
    const body = request.body;
    const type = body.itemType;
    const playableID = body.userId;

    pool.query(`SELECT * FROM Items WHERE PlayableID = ${playableID} AND Type = '${type}' AND Used = 0`, (error, results) => {
        if (error) response.status(400).json({"Error": "Unable to find available item in database. (Items)"});
        else { 
            var firstMatchingItemID = results.rows[0].id;
            pool.query(`UPDATE Items SET Used = 1 WHERE ID = ${firstMatchingItemID}`, (error, results) => {
                if (error) response.status(400).json({"Error": "Unable to update available item in database. (Items)"});
                else pool.query(`SELECT * FROM Items WHERE ID = ${firstMatchingItemID}`, (error, results) => {
                    if (error) response.status(400).json({"Error": "Unable to find newly used item in database. (Items)"});
                    else response.status(200).json(results.rows[0]);
                });
            })
        };
    });
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
    createItem,
    useItem
};
