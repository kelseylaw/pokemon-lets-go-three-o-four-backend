DROP TABLE Uses;
DROP TABLE Catches;
DROP TABLE MoveAcross;
DROP TABLE Battle;
DROP TABLE Heals;
DROP TABLE Sells;
DROP TABLE GymBadges_Received;
DROP TABLE Pokedex;
DROP TABLE OwnedBy;
DROP TABLE Pokemon;
DROP TABLE Species;
DROP TABLE Items;
DROP TABLE ItemTypes;
DROP TABLE NonPlayable;
DROP TABLE Playable;
DROP TABLE Characters;
DROP TABLE Building_Contained;
DROP TABLE MapRegions;

CREATE TABLE MapRegions(
	Name char(32) PRIMARY KEY,
	Type char(32) NOT NULL,
	MaxSpawnNumber int
);

CREATE TABLE Building_Contained(
	ID int,
	Region char(32),
	Type char(32),
	PRIMARY KEY (ID),
	FOREIGN KEY (Region) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Characters(
	ID int PRIMARY KEY,
	Name char(32),
	LocatedAt char(32),
	FOREIGN KEY (LocatedAt) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Playable(
	ID int PRIMARY KEY,
	Username char(32) UNIQUE,
	Password char(32) NOT NULL,
	CreatedAt date,
	BadgesOwned int,
	Balance int,
	Admin bit,
	FOREIGN KEY (ID) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE NonPlayable(
	ID int PRIMARY KEY,
	Role char(32),
	Reward int NOT NULL,
	FOREIGN KEY (ID) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE ItemTypes(
	Type char(32) PRIMARY KEY,
	Cost int NOT NULL
);

CREATE TABLE Items(
	ID int PRIMARY KEY,
	Type char(32) NOT NULL
	PlayableID int,
	FOREIGN KEY (Type) REFERENCES ItemTypes(Type) ON DELETE CASCADE,
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE
);

CREATE TABLE Species(
	ID int PRIMARY KEY,
	Name char(32),
	TypeI char(32) NOT NULL,
	TypeII char(32),
	FoundAt char(32),
	FOREIGN KEY (FoundAt) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Pokemon(
	ID int PRIMARY KEY, 
	Nickname char(32),
	PokeDexNum int,
	Status char(32),
	BattlesDone int,
	FOREIGN KEY (PokeDexNum) REFERENCES Species(ID) ON DELETE CASCADE
);

CREATE TABLE OwnedBy(
	PokemonID int PRIMARY KEY,
	OwnerID int NOT NULL,
	FOREIGN KEY (PokemonID) REFERENCES Pokemon(ID) ON DELETE CASCADE,
	FOREIGN KEY (OwnerID) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE Pokedex(
	OwnedBy int PRIMARY KEY, 
	Caught int,
	Seen int,
	FOREIGN KEY (OwnedBy) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE GymBadges_Received(
	BadgeID int,
	Name char(32) NOT NULL,
	PlayableID int,
	NonPlayableID int,
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (BadgeID, PlayableID, NonPlayableID),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (NonPlayableID) REFERENCES NonPlayable(ID) ON DELETE CASCADE
);

CREATE TABLE Sells(
	TransactionID int PRIMARY KEY,
	ItemID int, 
	BuildingID int,
	PlayableID int,
	HappenedAt timestamp NOT NULL,
	FOREIGN KEY (ItemID) REFERENCES Items(ID) ON DELETE CASCADE,
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (BuildingID) REFERENCES Building_Contained(ID) ON DELETE CASCADE
);

CREATE TABLE Heals(
	PokemonID int,
	BuildingID int, 
	PlayableID int,
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (PokemonID, BuildingID, PlayableID),
	FOREIGN KEY (PokemonID) REFERENCES Pokemon(ID) ON DELETE CASCADE,
	FOREIGN KEY (BuildingID) REFERENCES Building_Contained(ID) ON DELETE CASCADE
);

CREATE TABLE Battle(
	PlayableID int,
	NonPlayableID int,
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (PlayableID, NonPlayableID),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (NonPlayableID) REFERENCES NonPlayable(ID) ON DELETE CASCADE
);

CREATE TABLE MoveAcross(
	PlayableID int,
	MapName char(32),
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (PlayableID, MapName),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (MapName) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Catches(
	PlayableID int,
	PokeID int,
	ItemID int,
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (PlayableID, PokeID, ItemID),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (PokeID) REFERENCES Pokemon(ID) ON DELETE CASCADE,
	FOREIGN KEY (ItemID) REFERENCES Items(ID) ON DELETE CASCADE
);

CREATE TABLE Uses(
	PlayableID int,
	PokeID int,
	ItemID int,
	HappenedAt timestamp NOT NULL,
	PRIMARY KEY (PlayableID, PokeID, ItemID),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (PokeID) REFERENCES Pokemon(ID) ON DELETE CASCADE,
	FOREIGN KEY (ItemID) REFERENCES Items(ID) ON DELETE CASCADE
);


INSERT ALL
	INTO MapRegions VALUES('Celadon City', 'City', 0)
	INTO MapRegions VALUES('Cerulean City', 'City', 0)
	INTO MapRegions VALUES('Cinnabar Island', 'City', 0)
	INTO MapRegions VALUES('Diglett\'s Cave', 'Cave', 20)
	INTO MapRegions VALUES('Fuchsia City', 'City', 0)
	INTO MapRegions VALUES('Indigo Plateau', 'City', 0)
	INTO MapRegions VALUES('Mt Moon', 'Cave', 20)
	INTO MapRegions VALUES('Pallet Town', 'Town', 3)
	INTO MapRegions VALUES('Pewter City', 'City', 0)
	INTO MapRegions VALUES('Rock Tunnel', 'Cave', 20)
	INTO MapRegions VALUES('Route 1', 'Path', 10)
	INTO MapRegions VALUES('Route 11', 'Path', 20)
	INTO MapRegions VALUES('Route 12', 'Path', 10)
	INTO MapRegions VALUES('Route 2', 'Path', 10)
	INTO MapRegions VALUES('Route 3', 'Path', 10)
	INTO MapRegions VALUES('Route 4', 'Path', 10)
	INTO MapRegions VALUES('Route 5', 'Path', 10)
	INTO MapRegions VALUES('Route 6', 'Path', 20)
	INTO MapRegions VALUES('Route 7', 'Path', 10)
	INTO MapRegions VALUES('Route 8', 'Path', 10)
	INTO MapRegions VALUES('Route 9', 'Path', 10)
	INTO MapRegions VALUES('Saffron City', 'City', 0)
	INTO MapRegions VALUES('Vermilion City', 'City', 0)
	INTO MapRegions VALUES('Victory Road', 'Path', 0)
	INTO MapRegions VALUES('Viridian City', 'City', 0)
	INTO MapRegions VALUES('Viridian Forest', 'Forest', 20)
SELECT * FROM dual;

INSERT ALL
	INTO Building_Contained VALUES(1, 'Celadon City', 'Pokemon Center')
	INTO Building_Contained VALUES(2, 'Celadon City', 'PokeMart')
	INTO Building_Contained VALUES(3, 'Celadon City', 'Gym')
	INTO Building_Contained VALUES(4, 'Cerulean City', 'Pokemon Center')
	INTO Building_Contained VALUES(5, 'Cerulean City', 'PokeMart')
	INTO Building_Contained VALUES(6, 'Cerulean City', 'Gym')
	INTO Building_Contained VALUES(7, 'Cinnabar Island', 'Pokemon Center')
	INTO Building_Contained VALUES(8, 'Cinnabar Island', 'PokeMart')
	INTO Building_Contained VALUES(9, 'Cinnabar Island', 'Gym')
	INTO Building_Contained VALUES(10, 'Fuchsia City', 'Pokemon Center')
	INTO Building_Contained VALUES(11, 'Fuchsia City', 'PokeMart')
	INTO Building_Contained VALUES(12, 'Fuchsia City', 'Gym')
	INTO Building_Contained VALUES(13, 'Indigo Plateau', 'Pokemon Center')
	INTO Building_Contained VALUES(14, 'Indigo Plateau', 'PokeMart')
	INTO Building_Contained VALUES(15, 'Pewter City', 'Pokemon Center')
	INTO Building_Contained VALUES(16, 'Pewter City', 'PokeMart')
	INTO Building_Contained VALUES(17, 'Pewter City', 'Gym')
	INTO Building_Contained VALUES(18, 'Saffron City', 'Pokemon Center')
	INTO Building_Contained VALUES(19, 'Saffron City', 'PokeMart')
	INTO Building_Contained VALUES(20, 'Saffron City', 'Gym')
	INTO Building_Contained VALUES(21, 'Vermilion City', 'Pokemon Center')
	INTO Building_Contained VALUES(22, 'Vermilion City', 'PokeMart')
	INTO Building_Contained VALUES(23, 'Vermilion City', 'Gym')
	INTO Building_Contained VALUES(24, 'Viridian City', 'Pokemon Center')
	INTO Building_Contained VALUES(25, 'Viridian City', 'PokeMart')
	INTO Building_Contained VALUES(26, 'Viridian City', 'Gym')
	INTO Building_Contained VALUES(27, 'Pallet Town', 'Lab')
SELECT * FROM dual;

INSERT ALL
	INTO Characters VALUES(1, 'Red', 'Pallet Town')
	INTO Characters VALUES(2, 'Blue', 'Pallet Town')
	INTO Characters VALUES(3, 'Green', 'Pallet Town')
	INTO Characters VALUES(4, 'Yellow', 'Pallet Town')
	INTO Characters VALUES(5, 'Gold', 'Pallet Town')
	INTO Characters VALUES(6, 'Erika', 'Celadon City')
	INTO Characters VALUES(7, 'Misty', 'Cerulean City')
	INTO Characters VALUES(8, 'Blaine', 'Cinnabar Island')
	INTO Characters VALUES(9, 'Koga', 'Fuchsia City')
	INTO Characters VALUES(10, 'Brock', 'Pewter City')
	INTO Characters VALUES(11, 'Sabrina', 'Saffron City')
	INTO Characters VALUES(12, 'Lt.Surge', 'Vermilion City')
	INTO Characters VALUES(13, 'Giovanni', 'Viridian City')
	INTO Characters VALUES(14, 'Professor Oak', 'Pallet Town')
	INTO Characters VALUES(15, 'Trainer Cave', 'Diglett\'s Cave')
	INTO Characters VALUES(16, 'Trainer Moon', 'Mt Moon')
	INTO Characters VALUES(17, 'Trainer Tunnel', 'Rock Tunnel')
	INTO Characters VALUES(18, 'Trainer 1', 'Route 1')
	INTO Characters VALUES(19, 'Trainer 11', 'Route 11')
	INTO Characters VALUES(20, 'Trainer 12', 'Route 12')
	INTO Characters VALUES(21, 'Trainer 2', 'Route 2')
	INTO Characters VALUES(22, 'Trainer 3', 'Route 3')
	INTO Characters VALUES(23, 'Trainer 4', 'Route 4')
	INTO Characters VALUES(24, 'Trainer 5', 'Route 5')
	INTO Characters VALUES(25, 'Trainer 6', 'Route 6')
	INTO Characters VALUES(26, 'Trainer 7', 'Route 7')
	INTO Characters VALUES(27, 'Trainer 8', 'Route 8')
	INTO Characters VALUES(28, 'Trainer 9', 'Route 9')
	INTO Characters VALUES(29, 'Trainer Forest', 'Viridian Forest')
SELECT * FROM dual;

INSERT ALL
	INTO Playable VALUES(1, 'red', 'redpass', TO_DATE('2019-02-11','YYYY-MM-DD'), 5, 5000, 0)
	INTO Playable VALUES(2, 'blue', 'bluepass', TO_DATE('2019-02-12','YYYY-MM-DD'), 0, 1000, 0)
	INTO Playable VALUES(3, 'green', 'greenpass', TO_DATE('2019-02-13','YYYY-MM-DD'), 0, 1000, 0)
	INTO Playable VALUES(4, 'yellow', 'yellowpass', TO_DATE('2019-02-14','YYYY-MM-DD'), 0, 1000, 0)
	INTO Playable VALUES(5, 'gold', 'goldpass', TO_DATE('2019-02-15','YYYY-MM-DD'), 0, 1000, 1)
SELECT * FROM dual;

INSERT ALL
	INTO NonPlayable VALUES(6, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(7, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(8, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(9, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(10, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(11, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(12, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(13, 'Gym Leader', 1000)
	INTO NonPlayable VALUES(14, 'Non Trainer', 0)
	INTO NonPlayable VALUES(15, 'Trainer', 500)
	INTO NonPlayable VALUES(16, 'Trainer', 500)
	INTO NonPlayable VALUES(17, 'Trainer', 500)
	INTO NonPlayable VALUES(18, 'Trainer', 500)
	INTO NonPlayable VALUES(19, 'Trainer', 500)
	INTO NonPlayable VALUES(20, 'Trainer', 500)
	INTO NonPlayable VALUES(21, 'Trainer', 500)
	INTO NonPlayable VALUES(22, 'Trainer', 500)
	INTO NonPlayable VALUES(23, 'Trainer', 500)
	INTO NonPlayable VALUES(24, 'Trainer', 500)
	INTO NonPlayable VALUES(25, 'Trainer', 500)
	INTO NonPlayable VALUES(26, 'Trainer', 500)
	INTO NonPlayable VALUES(27, 'Trainer', 500)
	INTO NonPlayable VALUES(28, 'Trainer', 500)
	INTO NonPlayable VALUES(29, 'Trainer', 500)
SELECT * FROM dual;

INSERT ALL
	INTO ItemTypes VALUES('Poke Ball', 200)
	INTO ItemTypes VALUES('Great Ball', 600)
	INTO ItemTypes VALUES('Ultra Ball', 1200)
	INTO ItemTypes VALUES('Master Ball', 6000)
	INTO ItemTypes VALUES('Revive', 1500)
SELECT * from dual;

INSERT ALL
	INTO Items VALUES(1, 'Poke Ball', 1)
	INTO Items VALUES(2, 'Great Ball', 1)
	INTO Items VALUES(3, 'Ultra Ball', 1)
	INTO Items VALUES(4, 'Master Ball', 1)
	INTO Items VALUES(5, 'Revive', 1) 
SELECT * FROM dual;

INSERT ALL
	INTO Species VALUES(1, 'Bulbasaur', 'Grass', 'Poison', 'Pallet Town')
	INTO Species VALUES(2, 'Ivysaur', 'Grass', 'Poison', 'Pallet Town')
	INTO Species VALUES(3, 'Venusaur', 'Grass', 'Poison', 'Pallet Town')
	INTO Species VALUES(4, 'Charmander', 'Fire', NULL, 'Pallet Town')
	INTO Species VALUES(5, 'Charmeleon', 'Fire', NULL, 'Pallet Town')
	INTO Species VALUES(6, 'Charizard', 'Fire', 'Flying', 'Pallet Town')
	INTO Species VALUES(7, 'Squirtle', 'Water', NULL, 'Pallet Town')
	INTO Species VALUES(8, 'Wartortle', 'Water', NULL, 'Pallet Town')
	INTO Species VALUES(9, 'Blastoise', 'Water', NULL, 'Pallet Town')
	INTO Species VALUES(10, 'Caterpie', 'Bug', NULL, 'Viridian Forest')
	INTO Species VALUES(11, 'Metapod', 'Bug', NULL, 'Viridian Forest')
	INTO Species VALUES(12, 'Butterfree', 'Bug', 'Flying', 'Viridian Forest')
	INTO Species VALUES(13, 'Weedle', 'Bug', 'Poison', 'Viridian Forest')
	INTO Species VALUES(14, 'Kakuna', 'Bug', 'Poison', 'Viridian Forest')
	INTO Species VALUES(15, 'Beedrill', 'Bug', 'Poison', 'Viridian Forest')
	INTO Species VALUES(16, 'Pidgey', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(17, 'Pidgeotto', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(18, 'Pidgeot', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(19, 'Rattata', 'Normal', NULL, 'Route 1')
	INTO Species VALUES(20, 'Raticate', 'Normal', NULL, 'Route 1')
	INTO Species VALUES(21, 'Spearow', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(22, 'Fearow', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(23, 'Ekans', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(24, 'Arbok', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(25, 'Pikachu', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(26, 'Raichu', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(27, 'Sandshrew', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(28, 'Sandslash', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(29, 'NidoranF', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(30, 'Nidorina', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(31, 'Nidoqueen', 'Poison', 'Ground', 'Route 3')
	INTO Species VALUES(32, 'NidoranM', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(33, 'Nidorino', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(34, 'Nidoking', 'Poison', 'Ground', 'Route 3')
	INTO Species VALUES(35, 'Clefairy', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(36, 'Clefable', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(37, 'Vulpix', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(38, 'Ninetales', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(39, 'Jigglypuff', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(40, 'Wigglytuff', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(41, 'Zubat', 'Poison', 'Flying', 'Diglett\'s Cave')
	INTO Species VALUES(42, 'Golbat', 'Poison', 'Flying', 'Diglett\'s Cave')
	INTO Species VALUES(43, 'Oddish', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(44, 'Gloom', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(45, 'Vileplume', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(46, 'Paras', 'Bug', 'Grass', 'Viridian Forest')
	INTO Species VALUES(47, 'Parasect', 'Bug', 'Grass', 'Viridian Forest')
	INTO Species VALUES(48, 'Venonat', 'Bug', 'Poison', 'Viridian Forest')
	INTO Species VALUES(49, 'Venomoth', 'Bug', 'Poison', 'Viridian Forest')
	INTO Species VALUES(50, 'Diglett', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(51, 'Dugtrio', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(52, 'Meowth', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(53, 'Persian', 'Normal', NULL, 'Mt Moon')
	INTO Species VALUES(54, 'Psyduck', 'Water', NULL, 'Route 6')
	INTO Species VALUES(55, 'Golduck', 'Water', NULL, 'Route 6')
	INTO Species VALUES(56, 'Mankey', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(57, 'Primeape', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(58, 'Growlithe', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(59, 'Arcanine', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(60, 'Poliwag', 'Water', NULL, 'Route 6')
	INTO Species VALUES(61, 'Poliwhirl', 'Water', NULL, 'Route 6')
	INTO Species VALUES(62, 'Poliwrath', 'Water', NULL, 'Route 6')
	INTO Species VALUES(63, 'Abra', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(64, 'Kadabra', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(65, 'Alakazam', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(66, 'Machop', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(67, 'Machoke', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(68, 'Machamp', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(69, 'Bellsprout', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(70, 'Weepinbell', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(71, 'Victreebel', 'Grass', 'Poison', 'Route 5')
	INTO Species VALUES(72, 'Tentacool', 'Water', 'Poison', 'Route 6')
	INTO Species VALUES(73, 'Tentacruel', 'Water', 'Poison', 'Route 6')
	INTO Species VALUES(74, 'Geodude', 'Rock', 'Ground', 'Rock Tunnel')
	INTO Species VALUES(75, 'Graveler', 'Rock', 'Ground', 'Rock Tunnel')
	INTO Species VALUES(76, 'Golem', 'Rock', 'Ground', 'Rock Tunnel')
	INTO Species VALUES(77, 'Ponyta', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(78, 'Rapidash', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(79, 'Slowpoke', 'Water', 'Psychic', 'Route 6')
	INTO Species VALUES(80, 'Slowbro', 'Water', 'Psychic', 'Route 6')
	INTO Species VALUES(81, 'Magnemite', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(82, 'Magneton', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(83, 'Farfetch\'d', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(84, 'Doduo', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(85, 'Dodrio', 'Normal', 'Flying', 'Route 1')
	INTO Species VALUES(86, 'Seel', 'Water', NULL, 'Route 6')
	INTO Species VALUES(87, 'Dewgong', 'Water', 'Ice', 'Route 6')
	INTO Species VALUES(88, 'Grimer', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(89, 'Muk', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(90, 'Shellder', 'Water', NULL, 'Route 6')
	INTO Species VALUES(91, 'Cloyster', 'Water', NULL, 'Route 6')
	INTO Species VALUES(92, 'Gastly', 'Ghost', 'Poison', 'Route 9')
	INTO Species VALUES(93, 'Haunter', 'Ghost', 'Poison', 'Route 9')
	INTO Species VALUES(94, 'Gengar', 'Ghost', 'Poison', 'Route 9')
	INTO Species VALUES(95, 'Onix', 'Rock', 'Ground', 'Rock Tunnel')
	INTO Species VALUES(96, 'Drowzee', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(97, 'Hypno', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(98, 'Krabby', 'Water', NULL, 'Route 6')
	INTO Species VALUES(99, 'Kingler', 'Water', NULL, 'Route 6')
	INTO Species VALUES(100, 'Voltorb', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(101, 'Electrode', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(102, 'Exeggcute', 'Grass', 'Psychic', 'Route 5')
	INTO Species VALUES(103, 'Exeggutor', 'Grass', 'Psychic', 'Route 5')
	INTO Species VALUES(104, 'Cubone', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(105, 'Marowak', 'Ground', NULL, 'Diglett\'s Cave')
	INTO Species VALUES(106, 'Hitmonlee', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(107, 'Hitmonchan', 'Fighting', NULL, 'Route 7')
	INTO Species VALUES(108, 'Lickitung', 'Normal', NULL, 'Route 1')
	INTO Species VALUES(109, 'Koffing', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(110, 'Weezing', 'Poison', NULL, 'Route 3')
	INTO Species VALUES(111, 'Rhyhorn', 'Ground', 'Rock', 'Rock Tunnel')
	INTO Species VALUES(112, 'Rhydon', 'Ground', 'Rock', 'Rock Tunnel')
	INTO Species VALUES(113, 'Chansey', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(114, 'Tangela', 'Grass', NULL, 'Route 5')
	INTO Species VALUES(115, 'Kangaskhan', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(116, 'Horsea', 'Water', NULL, 'Route 6')
	INTO Species VALUES(117, 'Seadra', 'Water', NULL, 'Route 6')
	INTO Species VALUES(118, 'Goldeen', 'Water', NULL, 'Route 6')
	INTO Species VALUES(119, 'Seaking', 'Water', NULL, 'Route 6')
	INTO Species VALUES(120, 'Staryu', 'Water', NULL, 'Route 6')
	INTO Species VALUES(121, 'Starmie', 'Water', 'Psychic', 'Route 6')
	INTO Species VALUES(122, 'Mr. Mime', 'Psychic', NULL, 'Route 8')
	INTO Species VALUES(123, 'Scyther', 'Bug', 'Flying', 'Viridian Forest')
	INTO Species VALUES(124, 'Jynx', 'Ice', 'Psychic', 'Route 11')
	INTO Species VALUES(125, 'Electabuzz', 'Electric', NULL, 'Route 2')
	INTO Species VALUES(126, 'Magmar', 'Fire', NULL, 'Route 4')
	INTO Species VALUES(127, 'Pinsir', 'Bug', 'Flying', 'Viridian Forest')
	INTO Species VALUES(128, 'Tauros', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(129, 'Magikarp', 'Water', NULL, 'Route 6')
	INTO Species VALUES(130, 'Gyarados', 'Water', 'Flying', 'Route 6')
	INTO Species VALUES(131, 'Lapras', 'Water', 'Ice', 'Route 6')
	INTO Species VALUES(132, 'Ditto', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(133, 'Eevee', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(134, 'Vaporeon', 'Water', NULL, 'Route 11')
	INTO Species VALUES(135, 'Jolteon', 'Electric', NULL, 'Route 11')
	INTO Species VALUES(136, 'Flareon', 'Fire', NULL, 'Route 11')
	INTO Species VALUES(137, 'Porygon', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(138, 'Omanyte', 'Rock', 'Water', 'Rock Tunnel')
	INTO Species VALUES(139, 'Omastar', 'Rock', 'Water', 'Rock Tunnel')
	INTO Species VALUES(140, 'Kabuto', 'Rock', 'Water', 'Rock Tunnel')
	INTO Species VALUES(141, 'Kabutops', 'Rock', 'Water', 'Rock Tunnel')
	INTO Species VALUES(142, 'Aerodactyl', 'Rock', 'Flying', 'Route 11')
	INTO Species VALUES(143, 'Snorlax', 'Normal', NULL, 'Route 11')
	INTO Species VALUES(144, 'Articuno', 'Ice', 'Flying', 'Route 12')
	INTO Species VALUES(145, 'Zapdos', 'Electric', 'Flying', 'Route 12')
	INTO Species VALUES(146, 'Moltres', 'Fire', 'Flying', 'Route 12')
	INTO Species VALUES(147, 'Dratini', 'Dragon', NULL, 'Route 12')
	INTO Species VALUES(148, 'Dragonair', 'Dragon', NULL, 'Route 12')
	INTO Species VALUES(149, 'Dragonite', 'Dragon', 'Flying', 'Route 12')
	INTO Species VALUES(150, 'Mewtwo', 'Psychic', NULL, 'Route 12')
	INTO Species VALUES(151, 'Mew', 'Psychic', NULL, 'Route 12')
SELECT * FROM dual;

INSERT ALL
	INTO Pokedex VALUES(1, 1, 30)
	INTO Pokedex VALUES(3, 1, 1)
	INTO Pokedex VALUES(6, 1, 1)
	INTO Pokedex VALUES(7, 1, 1)
	INTO Pokedex VALUES(9, 1, 1)
SELECT * FROM dual;

INSERT ALL
	INTO Pokemon VALUES(1, 'Bulbasaur', 'Bulbasaur', 1, 'Grass', 'Poison', 'Healthy', 20, 1, 'Pallet Town')
	INTO Pokemon VALUES(2, 'Charmander', 'Charmander', 4, 'Fight', NULL, 'Healthy', 0, 3, 'Pallet Town') 
	INTO Pokemon VALUES(3, 'Squirtle', 'Squirtle', 7, 'Water', NULL, 'Healthy', 0, 6, 'Pallet Town') 
	INTO Pokemon VALUES(4, 'Pikachu', 'Pikachu', 25, 'Electric', NULL, 'Healthy', 0, 7, 'Pallet Town') 
	INTO Pokemon VALUES(5, 'Eevee', 'Eevee', 133, 'Normal', NULL, 'Healthy', 0, 9, 'Pallet Town') 
SELECT * FROM dual;

INSERT ALL
	INTO GymBadges_Received VALUES(1, 'Boulder Badge', 1, 11)
	INTO GymBadges_Received VALUES(2, 'Cascade Badge', 1, 12)
	INTO GymBadges_Received VALUES(3, 'Thunder Badge', 1, 13)
	INTO GymBadges_Received VALUES(4, 'Rainbow Badge', 1, 14)
	INTO GymBadges_Received VALUES(5, 'Soul Badge', 1, 15)
SELECT * FROM dual;


INSERT ALL
	INTO Sells VALUES(1, 1, 4, 3)
	INTO Sells VALUES(2, 3, 4, 1)
	INTO Sells VALUES(3, 2, 4, 7)
	INTO Sells VALUES(4, 5, 4, 1)
	INTO Sells VALUES(5, 2, 4, 1)
	INTO Sells VALUES(6, 3, 4, 9)
SELECT * FROM dual;

INSERT ALL
	INTO Heals VALUES(1, 3, 3)
	INTO Heals VALUES(2, 3, 1)
	INTO Heals VALUES(3, 3, 7)
	INTO Heals VALUES(4, 3, 1)
	INTO Heals VALUES(5, 3, 6)
	INTO Heals VALUES(1, 3, 9)
SELECT * FROM dual;

INSERT ALL
	INTO Battle VALUES(1, 4)
	INTO Battle VALUES(3, 10)
	INTO Battle VALUES(6, 12)
	INTO Battle VALUES(7, 13)
	INTO Battle VALUES(9, 14)
	INTO Battle VALUES(3, 5)
SELECT * FROM dual;

INSERT ALL
	INTO MoveAcross VALUES(1, 'Pallet Town')
	INTO MoveAcross VALUES(3, 'Route 1')
	INTO MoveAcross VALUES(6, 'Viridian Forest')
	INTO MoveAcross VALUES(7, 'Celadon City')
	INTO MoveAcross VALUES(9, 'Fuchsia City')
	INTO MoveAcross VALUES(3, 'Route 3')
SELECT * FROM dual;

INSERT ALL
	INTO Shows VALUES(1, 1) 
	INTO Shows VALUES(3, 2) 
	INTO Shows VALUES(6, 4) 
	INTO Shows VALUES(7, 3) 
	INTO Shows VALUES(9, 5) 
	INTO Shows VALUES(3, 4) 
SELECT * FROM dual;

INSERT ALL
	INTO Catches VALUES(1, 1, 3) 
	INTO Catches VALUES(3, 3, 4) 
	INTO Catches VALUES(6, 5, 5) 
	INTO Catches VALUES(7, 4, 3) 
	INTO Catches VALUES(9, 3, 5) 
	INTO Catches VALUES(3, 2, 4) 
SELECT * FROM dual;
