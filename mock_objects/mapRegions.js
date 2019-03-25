var mapRegions = [
  {
    id: 1,
    name: "Pallet Town",
    type: "Town",
    maxSpawnNumber: 0,
    buildings: []
  },
  {
    id: 2,
    name: "Viridian Forest",
    type: "Forest",
    maxSpawnNumber: 15,
    buildings: []
  },
  {
    id: 3,
    name: "Viridian City",
    type: "City",
    maxSpawnNumber: 0,
    buildings: [
      {
        id: 1,
        region: "Viridian City",
        type: "Pokemon Center"
      },
      {
        id: 2,
        region: "Viridian City",
        type: "Pokemart"
      },
      {
        id: 3,
        region: "Viridian City",
        type: "Gym"
      }
    ]
  }
]

module.exports = {
  mapRegions: mapRegions
}