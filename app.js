const {mapRegions} = require("./mapRegion");

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/mapRegion", (req, res) => {
  res.json({ data: mapRegions });
});

app.get("/mapRegion/:name", (req, res) => {
  const mapRegionName = req.params.name;
  const data = mapRegions.filter(mapRegion => mapRegion.name === mapRegionName);
  if (data.length === 1) {
    res.json(data[0]);
  } else {
    res.json({ error: `${mapRegionName} does not exist!` });
  }
});

app.patch("/account/:id", (req, res) => {
  const accountId = req.params.id;
  const newLocation = req.body.location;
  res.json(req.body);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))