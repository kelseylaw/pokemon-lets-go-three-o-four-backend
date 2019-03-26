const Pool = require('pg').Pool;

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
        res.status(200).json({"data": results.rows})
    })
};

const getBadgesFromID = (req, res) => {
    const badgeID = parseInt(req.params.badgeID);
    const playerID = parseInt(req.params.playerID);
    const npcID = parseInt(req.params.npcID);
    pool.query('SELECT * FROM GymBadges_Received WHERE badgeID = $1 AND playableID = $2 AND NonPlayableID = $3',
        [badgeID, playerID, npcID], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0])
    })
};

const createBadge = (req, res) => {
    const date = new Date().toISOString().substr(0,10);
    const {name, playableID, nonPlayableID} = req.body
    getNextID('GymBadges_Received').then(function (id) {
        pool.query('INSERT INTO GymBadges_Received VALUES ($1, $2, $3, $4, $5)',[id, name, playableID, nonPlayableID, date], (error, result) => {
            if (error) throw error;
            pool.query('SELECT * FROM GymBadges_Received WHERE ID=$1 AND PlayableID=$2 AND NonPlayable=$3',
                [id, playableID, nonPlayableID], (error, result) => {
                if (error) throw error;
                res.status(200).json(result.rows[0]);
            })
        })
    })

};

const updateBadge = (request, response) => {
    const badgeID = parseInt(request.params.badgeID);
    const playerID = parseInt(request.params.playerID);
    const npcID = parseInt(request.params.npcID);
    const {name, happenedAt} = request.body;
    pool.query('UPDATE GymBadges_Received SET Name = $2, happenedAt = $5 WHERE BadgeID = $1 AND PlayableID = $3 AND NonPlayableID = $4',
        [badgeID, name, playerID, npcID, happenedAt], (error, result) => {
        if (error) throw error;
        response.status(200).json(result.rows[0])
    })
};

const deleteBadge = (request, response) => {
    const badgeID = parseInt(request.params.badgeID);
    const playerID = parseInt(request.params.playerID);
    const npcID = parseInt(request.params.npcID);
    pool.query('DELETE FROM GymBadges_Received WHERE BadgeID = $1 AND PlayableID = $2, AND NonPlayableID = $3',
        [badgeID, playerID, npcID], (error, result) => {
        if (error) throw error;
        response.status(200).send(`Badge deleted with ID: ${badgeID}, PlayableID = ${playerID}, NonPlayableID = ${npcID}`);
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
    getBadges,
    getBadgesFromID,
    createBadge,
    updateBadge,
    deleteBadge
};
