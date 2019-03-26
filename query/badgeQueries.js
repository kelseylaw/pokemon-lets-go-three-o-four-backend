const Pool = require('pg').Pool

const pool = new Pool({
    user: 'three',
    host: 'localhost',
    database: 'proj304',
    password: 'p304',
    port: 5432,
});

const getBadges = (req, res) => {
    pool.query('SELECT * FROM GymBadges_Received', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
};

const getBadgesFromID = (req, res) => {
    const {badgeID, playerID, npcID} = req.body;
    pool.query('SELECT * FROM GymBadges_Received WHERE badgeID = $1 AND playableID = $2 AND NonPlayableID = $3',
        [badgeID, playerID, npcID], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
};

const createBadge = (req, res) => {
    const id = getNextID('GymBadges_Received');

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
}

modules.exponent = {
    getBadges,
    getBadgesFromID,

};
