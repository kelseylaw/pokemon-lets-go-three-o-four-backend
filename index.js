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

app.get('/pokemon', db.getPokemons);
app.get('/pokemon/:id', db.getPokemonByID);
app.post('/pokemon', db.createPokemon);
app.put('/pokemon/:id', db.updatePokemon);
app.delete('/pokemon/:id', db.deletePokemon);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});