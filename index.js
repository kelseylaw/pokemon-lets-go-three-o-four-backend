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
const battleQueries = require('./query/battleQueries');
const moveAcrossQueries = require('./query/moveAcrossQueries');
const healQueries = require('./query/healQueries');
const sellQueries = require('./query/sellQueries');
const catchQueries = require('./query/catchesQueries');
const usesQueries = require('./query/usesQueries');

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
app.get("/user/allItemType", playerQueries.getUsersWithAllItemType)
app.get("/user/count", playerQueries.totalOwnedByPlayer);
app.get("/user/:id", playerQueries.findUserByID)
app.get("/user/:id/pokemons", playerQueries.getPokemonsByUserID)
app.get("/user/:id/itemCount", playerQueries.getItemCount)
app.get("/user/:id/speciesCount", playerQueries.getDistinctSpeciesCaughtByUserID)
app.get("/user/:id/gymBadges", playerQueries.getBadgesByUserID)
app.get("/user/:id/heals", playerQueries.getHealRecordsByUserID)
app.get("/user/:id/sells", playerQueries.getSellsRecordsByUserID)
app.get("/user/:id/catches", playerQueries.getCatchesRecordsByUserID)
app.get("/user/:id/movements", playerQueries.getMoveAcrossRecordsByUserID)
app.get("/user/:id/itemUses", playerQueries.getItemUseRecordsByUserID)
app.get("/user/:id/pokemons/:speciesid", playerQueries.getSpeciesPokemonsByUserID)
app.post("/user", playerQueries.addNewUser)
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
app.put("/mapRegion/:name", mapQueries.updateMapRegion);
app.delete("mapRegion/:name", mapQueries.deleteMapRegion);

// Items
app.post('/item', itemQueries.createItem);
app.put('/item', itemQueries.useItem);

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
app.get("/species/search", speciesQueries.getSpeciesCond);
app.get("/species/:proj/search", speciesQueries.getSpeciesProjCond);
app.get("/species/:id", speciesQueries.getSpeciesID);

// Badges
app.get('/gymBadges', badgeQueries.getBadges);
app.get('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.getBadgesFromID);
app.post('/gymBadges', badgeQueries.createBadge);
app.put('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.updateBadge);
app.delete('/gymBadges/:badgeID/:playerID/:npcID', badgeQueries.deleteBadge);

// ItemTypes
app.get('/itemType', itemTypeQueries.getItemTypes);
app.put('/itemType/:type', itemTypeQueries.updateItemTypeCost);
app.delete('/itemType/:type', itemTypeQueries.deleteItemType);

// Building
app.get('/building/:id', buildingQuereis.getBuildingFromID);
app.post('/building', buildingQuereis.createBuilding);
app.put('/building/:id', buildingQuereis.updateBuilding);
app.delete('/building/:id', buildingQuereis.deleteBuilding);

// Battle
app.get('/battle', battleQueries.getBattles);
app.get('/battle/:id', battleQueries.getBattleFromID);
app.post('/battle', battleQueries.addBattle);
app.delete('/battle/:id', battleQueries.deleteBattle);

// MoveAcross
app.get('/moveAcross', moveAcrossQueries.getMoveAcrossRecords);
app.post('/moveAcross', moveAcrossQueries.addMoveAcross);

// Heals
app.post('/heal', healQueries.addHealRecord);
app.get('/heal', healQueries.getAllHealRecords);

// Sells
app.post('/sell', sellQueries.addSellRecord);
app.get('/sell', sellQueries.allSellRecords);

// Catch
app.post('/catch', catchQueries.addCatchRecord);
app.get('/catch', catchQueries.getAllRecords);

// Uses
app.post('/use', usesQueries.addUsesRecord);
app.get('/use', usesQueries.getUsesRecords);


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
