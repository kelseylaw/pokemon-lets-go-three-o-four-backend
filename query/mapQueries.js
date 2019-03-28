const Pool = require('pg').Pool

const pool = new Pool({
  user: 'three',
  host: 'localhost',
  database: 'proj304',
  password: 'p304',
  port: 5432,
})

const getMapRegions = (req, res) => {
  pool.query('SELECT * FROM MapRegions', (error, results) => {
    if (error) throw error;
    res.status(200).json({"data": results.rows});
  })
}

const findMapRegion = (req, res) => {
  const mapRegionName = req.params.name;
  pool.query(`SELECT * FROM MapRegions WHERE Name = '${mapRegionName}'`, (error, results) => {
    if (error) throw error;
    else if (results.rows.length < 1) {
      res.status(204).json({"Error": "Map region could not be found!"});
    } else {
      var mapRegion = results.rows[0];
      pool.query(`SELECT * FROM Building_Contained WHERE Region = '${mapRegionName}'`, (error, newResults) => {
        if (error) throw error;
        mapRegion["buildings"] = newResults.rows;
        res.status(200).json(mapRegion);
      })
    }
  })
}

const updateMapRegion = (request, response) => {
  const name = request.params.name;
  const number = parseInt(request.body.maxSpawnNumber);
  pool.query('UPDATE MapRegions SET MaxSpawnNumber = $2 WHERE Name = $3', [number, name], (error, results) => {
    if (error) throw error;
    pool.query('SELECT * FROM MapRegions Where Name = $1', [name], (error, results) => {
      if (error) throw error;
      response.status(200).json(results.rows[0]);
    })
  })
};

const deleteMapRegion = (request, response) => {
  const name = request.params.name;
  pool.query('DELETE FROM MapRegions WHERE Name = $1', [name], (error, result) => {
        if (error) throw error;
        response.status(200).send(`Badge deleted with Name: ${name}`);
  })
};

module.exports = {
  getMapRegions,
  findMapRegion,
  updateMapRegion,
  deleteMapRegion
};
