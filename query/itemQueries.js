const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});
const getItemById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * from Items WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0])
    })
};

const getItemsFromPlayable = (request, response) => {
    const id = parseInt(request.params.playableID);
    pool.query('SELECT * from Items WHERE PlayableID = $1',[id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({data: results.rows});
    })
};

const createItem = (request, response) => {
    const {type, playableID, used} = request.body;
    getNextID('Items').then(function(id) {
        pool.query('INSERT INTO Items VALUES ($1, $2, $3, $4)',
            [id, type, playableID, used], (error, results) => {
                if (error) {
                    throw error
                }
                pool.query(`SELECT * FROM Items WHERE ID=${id}`, (error, results) => {
                    if (error) throw error;
                    response.status(200).json(results.rows[0]);
                });
        })
    })
};

const updateItem = (request, response) => {
    const id = parseInt(request.params.id);
    const {type, playableID, used} = request.body;

    pool.query('UPDATE Items SET role = $1, reward = $2, used = $3 WHERE id = $4',
        [type, playableID, used, id],
        (error, results) => {
            if (error) {
                throw error
            }
            pool.query('SELECT * FROM Items WHERE ID = $1', [id], (error, results) => {
                if (error) throw error;
                response.status(200).json(results.rows[0])
            })
        }
    )
};

const deleteItem = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM Items WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Item deleted with ID: ${id}`)
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
    getItemById,
    getItemsFromPlayable,
    createItem,
    updateItem,
    deleteItem
};
