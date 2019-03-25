
var users = require("./mock_objects/users");
var pokemons = require("./mock_objects/pokemons");
var ownedBy = require("./mock_objects/ownedBy");
var species = require("./mock_objects/species");
var npc = require("./mock_objects/npc");
var items = require("./mock_objects/items");

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

const filterItemsByUserID = (userID) => {
    const data = items.items.filter(item => item.playableID === userID);
    return data.map(a => a.Type);
}

const countItems = (itemsList) => {
    var counts = [0,0,0,0,0];
    var itemTypes = ["Poke Ball", "Great Ball", "Ultra Ball", "Master Ball", "Revive"];
    var result = [];
    for (i = 0 ; i < itemsList.length ; i ++) {
        if (itemsList[i] === "Poke Ball") {
            counts[0]++
        } else if (itemsList[i] === "Great Ball") {
            counts[1]++
        } else if (itemsList[i] === "Ultra Ball") {
            counts[2]++
        } else if (itemsList[i] === "Master Ball") {
            counts[3]++
        } else if (itemsList[i] === "Revive") {
            counts[4]++
        }
    }
    counts.map((count, index) => result.push({"itemType": itemTypes[index], "itemCount": count}));
    return result;
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
    filterItemsByUserID,
    countItems,
    filterSpeciesByFoundAt,
    findNPCbyID,
    deleteNPC
}
