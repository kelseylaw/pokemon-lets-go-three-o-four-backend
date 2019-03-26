const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});
const getItemById = (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * from Items WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getItemsFromPlayable = (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * from Items WHERE PlayableID = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createItem = (request, response) => {
    const id = getNextID('Items');
    const {type, playableID, used} = request.body;
    pool.query('INSERT INTO Items VALUES ($1, $2, $3, $4)',
        [id, type, playableID, used], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Item added with ID: ${id}`)
        })
};

const updateItem = (request, response) => {
    const id = parseInt(request.params.id);
    const {type, playableID, used} = request.body;

    pool.query(
        'UPDATE Items SET role = $1, reward = $2, used = $3 WHERE id = $4',
        [type, playableID, used, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Item modified with ID: ${id}`)
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
