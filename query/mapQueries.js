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
    res.status(200).json(results.rows);
  })
}

const findMapRegion = (req, res) => {
  const mapRegionName = req.params.name;
  pool.query(`SELECT * FROM MapRegions WHERE Name = '${mapRegionName}'`, (error, results) => {
    if (error) throw error;
    else if (results.rows.length < 1) {
      // please check formatting of message, and change to consistent formatting if wrong
      res.status(204).json({"Error": "Map region could not be found!"});
    } else {
      var mapRegion = results.rows[0];
      pool.query(`SELECT * FROM Building_Contained WHERE Region = '${mapRegionName}'`, (error, results) => {
        if (error) throw error;
        mapRegion.buildings = results.rows;
      })
      res.status(200).json(mapRegion);
    }
  })
}

module.exports = {
  getMapRegions,
  findMapRegion
}