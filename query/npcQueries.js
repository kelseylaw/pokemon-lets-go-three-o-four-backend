const Pool = require('pg').pool;

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const getNPC = (request, response) => {
    pool.query('SELECT * from nonPlayable', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getNPCByID = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * from nonPlayable WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

const allNPCsInRegion = (req, res) => {
    const region = req.params.foundAt;
    pool.query('SELECT * from nonPlayable np, characters c WHERE np.id=c.id AND c.LocateAt=$1',
        [region], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

const createNPC = (req, res) => {
    const {id, role, reward} = req.body;
    pool.query('INSERT INTO nonPlayable VALUES ($1, $2, $3)',
        [id, role, reward], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`NonPlayable added with ID: ${id}`)
        })
};

const updateNPC = (request, response) => {
    const id = parseInt(request.params.id);
    const {role, reward} = request.body;

    pool.query(
        'UPDATE nonPlayable SET role = $1, reward = $2 WHERE id = $3', [role, reward, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`NonPlayable modified with ID: ${id}`)
        }
    )
};

const deleteNPC = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM nonPlayable WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`NonPlayable deleted with ID: ${id}`)
    })
};

module.exports = {
    getNPC,
    getNPCByID,
    allNPCsInRegion,
    createNPC,
    updateNPC,
    deleteNPC
};
