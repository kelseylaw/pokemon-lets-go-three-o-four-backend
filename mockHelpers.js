
var users = require("./mock_objects/users");
var pokemons = require("./mock_objects/pokemons");
var ownedBy = require("./mock_objects/ownedBy");

const findUserByID = (userID) => {
    const data = users.users.filter(playable => playable.ID === userID);
    if (data.length === 1) {
        return data[0];
    } else {
        return null;
    }
    }
      
const filterPokemonsByUserID = (userID) => {
    const data = ownedBy.ownedBy.filter(ownedBy => ownedBy.OwnerID === userID);
    return data.map(a => a.PokemonID);
}

const findPokemonByID = (pokemonID) => {
    const data = pokemons.pokemons.filter(pokemon => pokemon.id === pokemonID);
    if (data.length === 1) {
        return data[0];
    } else {
        return null;
    }
}

module.exports = {
    findUserByID,
    filterPokemonsByUserID,
    findPokemonByID
  }