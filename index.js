const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

// Pokemon
app.get('/pokemon', db.getPokemons);
app.get('/pokemon/:id', db.getPokemonByID);
app.post('/pokemon', db.createPokemon);
app.put('/pokemon/:id', db.updatePokemon);
app.delete('/pokemon/:id', db.deletePokemon);

// Items
app.get('/item/:id', db.getItemById);
app.get('/item/:playableID', db.getItemsFromPlayable);
app.post('/item', db.createItem);
app.put('/item/:id', db.updateItem);
app.delete('item/:id', db.deleteItem);

// NPC
app.get('/npc', db.getNPC());
app.get('/npc/:id', db.getNPCByID);
app.post('/npc', db.createNPC);
app.put('/npc/:id', db.updateNPC);
app.delete('/npc/:id', db.deleteNPC);



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
