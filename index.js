const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const port = 3000

const pokemonQueries = require('./query/pokemonQueries')
const playerQueries = require('./query/playerQueries')
const mapQueries = require('./query/mapQueries')
const itemQueries = require('./query/itemQueries');
const npcQueries = require('./query/npcQueries');
const speciesQueries = require('./query/speciesQueries');
const badgeQueries = require('./query/badgeQueries');
const itemTypeQueries = require('./query/itemTypeQueries');
const buildingQuereis = require('./query/buildingQueries');

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
app.get("/user/:id/itemCount", playerQueries.getItemCount)
app.get("/user/:id/pokedex", playerQueries.getPokedexByUserID)
app.get("/user/:id/gymBadges", playerQueries.getBadgesByUserID)
app.get("/user/:id/heals", playerQueries.getHealRecordsByUserID)
app.get("/user/:id/sells", playerQueries.getSellsRecordsByUserID)
app.get("/user/:id/catches", playerQueries.getCatchesRecordsByUserID)
app.get("/user/:id/movements", playerQueries.getMoveAcrossRecordsByUserID)
app.get("/user/:id/itemUses", playerQueries.getItemUseRecordsByUserID)
app.get("/user/:id/pokemons/:speciesid", playerQueries.getSpeciesPokemonsByUserID)
app.get("/user/:id/speciesCount", playerQueries.getNumberSpeciesCaughtByUserID)
app.post("/user", playerQueries.addNewUserNewPokedex)
app.put("/user/:id", playerQueries.editUserByID)
app.put("/user/:id/move", playerQueries.movePlayerLocationByID)
app.delete("/user/:id", playerQueries.deletePlayerByUserID)

// Pokemon
app.get('/pokemon', pokemonQueries.getPokemons)
app.get('/pokemon/:id', pokemonQueries.getPokemonByID)
app.post('/pokemon', pokemonQueries.createPokemon)
app.put('/pokemon/:id', pokemonQueries.updatePokemon)
app.delete('/pokemon/:id', pokemonQueries.deletePokemon)
app.get('/pokemon/:speciesid/population', pokemonQueries.countPokemonBySpecies)

// MapRegion
app.get("/mapRegion", mapQueries.getMapRegions)
app.get("/mapRegion/:name", mapQueries.findMapRegion)

// Items
app.get('/item/:id', itemQueries.getItemById);
app.get('/item/:playableID', itemQueries.getItemsFromPlayable);
app.post('/item', itemQueries.createItem);
app.put('/item/:id', itemQueries.updateItem);
app.delete('item/:id', itemQueries.deleteItem);

// ItemTypes
app.get('/itemType', itemTypeQueries.getItemTypes);

// NPC
app.get('/npc', npcQueries.getNPC);
app.get("/npc/search", npcQueries.getNPCByLocatedAt);
app.get('/npc/:id', npcQueries.getNPCByID);
app.get('/npc/:foundAt', npcQueries.allNPCsInRegion);
app.post('/npc', npcQueries.createNPC);
app.put('/npc/:id', npcQueries.updateNPC);
app.delete('/npc/:id', npcQueries.deleteNPC);

// Species
app.get("/species", speciesQueries.getSpecies);
app.get("/species/search", speciesQueries.getSpeciesFoundAt);
app.get("/species/:id", speciesQueries.getSpeciesID);

// badges
app.get('/gymBadges', badgeQueries.getBadges);
app.get('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.getBadgesFromID);
app.post('/gymBadges', badgeQueries.createBadge);
app.put('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.updateBadge);
app.delete('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.deleteBadge);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
