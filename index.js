const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const playerQueries = require('./query/playerQueries')

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post("/authenticate", playerQueries.authenticateUser)

app.get("/user", playerQueries.getUsers)

app.get("/user/:id", playerQueries.findUserByID)

app.get("/user/:id/pokemons", db.getPokemonsByUserID);

app.post("/user", playerQueries.addNewUser)

app.put("/user/:id", playerQueries.editUserByID)

app.get('/pokemon', db.getPokemons)

app.get("/mapRegion", db.getMapRegions)

app.get("/mapRegion/:name", db.findMapRegion)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})