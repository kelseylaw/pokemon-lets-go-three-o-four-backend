const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const port = 3000

const pokemonQueries = require('./query/pokemonQueries')
const playerQueries = require('./query/playerQueries')
const mapQueries = require('./query/mapQueries')
const battleQueries = require('./query/battleQueries')
const itemQueries = require('./query/itemQueries')
const npcQueries = require('./query/npcQueries')

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({credentials: true, origin: true}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

// Playable Characters
app.post("/authenticate", playerQueries.authenticateUser)
app.get("/user", playerQueries.getUsers)
app.get("/user/:id", playerQueries.findUserByID)
app.get("/user/:id/pokemons", playerQueries.getPokemonsByUserID)
app.get("/user/:id/battles", playerQueries.getBattlesByUserID)
app.get("/user/:id/itemCount", playerQueries.getItemCount)
app.post("/user", playerQueries.addNewUser)
app.put("/user/:id", playerQueries.editUserByID)
app.delete("/user/:id", playerQueries.deletePlayerByUserID)

// Pokemon
app.get('/pokemon', pokemonQueries.getPokemons)
app.get('/pokemon/:id', pokemonQueries.getPokemonByID)
app.post('/pokemon', pokemonQueries.createPokemon)
app.put('/pokemon/:id', pokemonQueries.updatePokemon)
app.delete('/pokemon/:id', pokemonQueries.deletePokemon)

// MapRegion
app.get("/mapRegion", mapQueries.getMapRegions)
app.get("/mapRegion/:name", mapQueries.findMapRegion)

// Items
app.get('/item/:id', itemQueries.getItemById);
app.get('/item/:playableID', itemQueries.getItemsFromPlayable);
app.post('/item', itemQueries.createItem);
app.put('/item/:id', itemQueries.updateItem);
app.delete('item/:id', itemQueries.deleteItem);

// NPC
app.get('/npc', npcQueries.getNPC);
app.get('/npc/:id', npcQueries.getNPCByID);
app.get('/npc/:foundAt', npcQueries.allNPCsInRegion);
app.post('/npc', npcQueries.createNPC);
app.put('/npc/:id', npcQueries.updateNPC);
app.delete('/npc/:id', npcQueries.deleteNPC);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
