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
var itemTypes = require("./mock_objects/itemTypes");
var species = require("./mock_objects/species");
var npc = require("./mock_objects/npc");
var badges = require("./mock_objects/gymBadges");
var items = require("./mock_objects/items");


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

app.get("/itemType", (req, res) => {
  res.json({ data: itemTypes.itemTypes })
});

app.get("/species/search", (req, res) => {
  const foundAt = req.query.foundAt;
  const result = mockHelpers.filterSpeciesByFoundAt(foundAt);

  if (result.length > 0) {
    res.json({ data: result });
  } else {
    res.json({ error: `There are no species found at ${foundAt}`});
  }
})

// items
app.get("/item/:id", (req,res) => {
  const itemID = parseInt(req.params.id);
  const data = mockHelpers.findItemByID(itemID);
  if (data !== null) {
    res.json(data);
  } else {
    res.json({ error: `${itemID} does not exist!` });
  }
});

app.delete("/item/:id", (req, res) => {
  const itemID = parseInt(req.params.id);
  const data = mockHelpers.deleteItem(itemID);
  if (data !== null) {
    res.json(data);
  } else {
    res.json({ error: `${itemID} does not exist!` });
  }
});

// NonPlayable
app.get("/npc", (req, res) => {
  res.json({data: npc.npc})
});

app.get("/npc/:id", (req, res) => {
  const npcID = parseInt(req.params.id);
  const data = mockHelpers.findNPCbyID(npcID);
  if (data !== null) {
    res.json(data);
  } else {
    res.json({ error: `${npcID} does not exist!` });
  }
});

//app.post("/npc/:id/:reward", (req, res) => {})

//app.patch('/npc/:id', (req, res) => {})

app.delete("/npc/:id", (req, res) => {
  const npcID = parseInt(req.params.id);
  const data = mockHelpers.deleteNPC(npcID);
  if (data !== null) {
    res.json(data);
  } else {
    res.json({ error: `${npcID} does not exist!` });
  }
});

// badges
app.get("/gymbadges", (req, res) => {
  res.json({data: badges.badges})
});

