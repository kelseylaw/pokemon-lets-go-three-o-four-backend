
var users = require("./mock_objects/users");
var pokemons = require("./mock_objects/pokemons");
var ownedBy = require("./mock_objects/ownedBy");
var species = require("./mock_objects/species");
var npc = require("./mock_objects/npc");

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

const filterSpeciesByFoundAt = (foundAt) => {
    const result = [];

    for (let i = 0; i < species.species.length; i++) {
        if (species.species[i].foundAt === foundAt) {
            result.push(species.species[i]);
        }
    }

    return result;
}

const findNPCbyID = (npcID) => {
    const data = npc.npc.filter(nonPlayable => nonPlayable.id === npcID)
    if (data.length === 1) {
        return data[0];
    } else {
        return null;
    }
};

const deleteNPC = (npcID) => {
    for (let i = 0; i < npc.npc.length; i++) {
        if (npc.npc[i].id === npcID) {
            delete npc.npc[i];
            return npcID;
        }
    }
    return null;
};

module.exports = {
    findUserByID,
    filterPokemonsByUserID,
    findPokemonByID,
    filterSpeciesByFoundAt,
    findNPCbyID,
    deleteNPC
}
