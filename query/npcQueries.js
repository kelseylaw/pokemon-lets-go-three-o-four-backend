const Pool = require('pg').Pool;

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
            throw error;
        }
        response.status(200).json({"data": results.rows})
    })
};

const getNPCByID = (req, res) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * from nonPlayable WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows[0])
    })
};

const getNPCByLocatedAt = (req, res) => {
    pool.query(condBuilder('nonPlayable', req.query), (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({ data: results.rows });
    })
}

const allNPCsInRegion = (req, res) => {
    const region = req.params.foundAt;
    pool.query('SELECT * from NonPlayable INNER JOIN Characters ON NonPlayable.id=Characters.id WHERE Characters.LocateAt=$1',
        [region], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({"data": results.rows})
    })
};

const createNPC = (req, res) => {
    const {name, mapRegion, role, reward} = req.body;
    getNextID('nonPlayable').then(function (id) {
        pool.query('INSERT INTO Characters VALUES ($1, $2, $3)',
            [id, name, mapRegion], (error, results) => {
                if (error) {
                    throw error;
                }
            });
        pool.query('INSERT INTO nonPlayable VALUES ($1, $2, $3)',
            [id, role, reward], (error, results) => {
                if (error) {
                    throw error
                }
                pool.query('SELECT * FROM NonPLayable WHERE ID = $1', [id], (error, results) => {
                    if (error) throw error;
                    res.status(200).json(results.rows[0])
                })
        })
    });

};

const updateNPC = (request, response) => {
    const id = parseInt(request.params.id);
    const reward = request.body.reward;

    pool.query(
        'UPDATE nonPlayable SET reward = $2 WHERE id = $3', [reward, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            pool.query('SELECT * FROM NonPlayable WHERE id=$1', [id], (error, results) => {
                if (error) throw error;
                response.status(200).json(results.rows[0])
            })
        }
    )
};

const deleteNPC = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM nonPlayable WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        pool.query('DELETE FROM Characters WHERE id = $1', [id], (error, results) => {
            if (error) throw error;
            response.status(200).send(`NonPlayable deleted with ID: ${id}`);
        })
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


// to build a sql query table is which table you are selecting form 
// json is the req.query you got from endpoint
// usage example see getSpeciesFoundAt
function condBuilder(table, json) {
    let length = parseInt(Object.keys(json).length);
    const keys =  Object.keys(json);
    const values = Object.values(json);
    let counter = 0;
    let query = `SELECT * from Characters RIGHT JOIN ${table} ON Characters.ID = ${table}.ID WHERE ${keys[counter]} = '${values[counter]}'`;
    counter++;
    length--;
    while (length !== 0) {
      query = query + ` AND ${keys[counter]} = '${values[counter]}'`;
      counter++;
      length--;
    }
    return query;
  }

module.exports = {
    getNPC,
    getNPCByID,
    allNPCsInRegion,
    createNPC,
    updateNPC,
    deleteNPC,
    getNPCByLocatedAt
};
