const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const pokemonQueries = require('./query/pokemonQueries')
const playerQueries = require('./query/playerQueries')
const mapQueries = require('./query/mapQueries')
const speciesQueries = require('./query/speciesQueries')

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.post("/authenticate", playerQueries.authenticateUser)
app.get("/user", playerQueries.getUsers)
app.get("/user/:id", playerQueries.findUserByID)
app.get("/user/:id/pokemons", playerQueries.getPokemonsByUserID);
app.post("/user", playerQueries.addNewUser)
app.put("/user/:id", playerQueries.editUserByID)

app.get('/pokemon', pokemonQueries.getPokemons)
app.get('/pokemon/:id', pokemonQueries.getPokemonByID);
app.post('/pokemon', pokemonQueries.createPokemon);
app.put('/pokemon/:id', pokemonQueries.updatePokemon);
app.delete('/pokemon/:id', pokemonQueries.deletePokemon);

app.get("/mapRegion", mapQueries.getMapRegions)
app.get("/mapRegion/:name", mapQueries.findMapRegion)

app.get("/species", speciesQueries.getSpecies);
app.get("/species/:id", speciesQueries.getSpeciesID);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});