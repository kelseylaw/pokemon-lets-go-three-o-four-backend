const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3000;

const mockHelpers = require("./mockHelpers");

var mapRegions = require("./mock_objects/mapRegions");
var users = require("./mock_objects/users");
var pokemons = require("./mock_objects/pokemons");
var ownedBy = require("./mock_objects/ownedBy");

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

app.get("/", (req, res) => res.send("Hello World!"))

app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get("/mapRegion", (req, res) => {
  res.json({ data: mapRegions.mapRegions });
});

app.get("/mapRegion/:name", (req, res) => {
  const mapRegionName = req.params.name;
  const data = mapRegions.mapRegions.filter(mapRegion => mapRegion.name === mapRegionName);
  if (data.length === 1) {
    res.json(data[0]);
  } else {
    res.json({ error: `${mapRegionName} does not exist!` });
  }
});

app.get("/user", (req, res) => {
    res.json({ data: users.users });
});

app.get("/user/:id", (req, res) => {
  const playableID = parseInt(req.params.id);
  const data = mockHelpers.findUserByID(playableID);
  if (data !== null) {
    res.json(data);
  } else {
    res.json({ error: `${playableID} does not exist!` });
  }
});

app.patch("/user/:id", (req, res) => {
  const accountId = req.query.id;
  const newLocation = req.body.location;
  res.json(req.body);
})

app.get("/user/:id/pokemons", (req, res) => {
  const playableID = parseInt(req.params.id);
  const pokemonIDs = mockHelpers.filterPokemonsByUserID(playableID);
  const array = pokemonIDs.map(pokemonID => mockHelpers.findPokemonByID(pokemonID));
  res.json(array);
});