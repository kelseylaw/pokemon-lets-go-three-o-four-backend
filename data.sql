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
	Name varchar(32) PRIMARY KEY,
	Type varchar(32) NOT NULL,
	MaxSpawnNumber int
);

CREATE TABLE Building_Contained(
	ID int,
	Region varchar(32),
	Type varchar(32),
	PRIMARY KEY (ID),
	FOREIGN KEY (Region) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Characters(
	ID int PRIMARY KEY,
	Name varchar(32),
	LocatedAt varchar(32),
	FOREIGN KEY (LocatedAt) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Playable(
	ID int PRIMARY KEY,
	Username varchar(32) UNIQUE,
	Password varchar(32) NOT NULL,
	CreatedAt date,
	BadgesOwned int,
	Balance int,
	Admin int,
	FOREIGN KEY (ID) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE NonPlayable(
	ID int PRIMARY KEY,
	Role varchar(32),
	Reward int NOT NULL,
	FOREIGN KEY (ID) REFERENCES Characters(ID) ON DELETE CASCADE
);

CREATE TABLE ItemTypes(
	Type varchar(32) PRIMARY KEY,
	Cost int NOT NULL
);

CREATE TABLE Items(
	ID int PRIMARY KEY,
	Type varchar(32) NOT NULL,
	PlayableID int,
	Used int,
	FOREIGN KEY (Type) REFERENCES ItemTypes(Type) ON DELETE CASCADE,
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE
);

CREATE TABLE Species(
	ID int PRIMARY KEY,
	Name varchar(32),
	TypeI varchar(32) NOT NULL,
	TypeII varchar(32),
	FoundAt varchar(32),
	FOREIGN KEY (FoundAt) REFERENCES MapRegions(Name) ON DELETE CASCADE
);

CREATE TABLE Pokemon(
	ID int PRIMARY KEY, 
	Nickname varchar(32),
	PokeDexNum int,
	Status varchar(32),
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
	Name varchar(32) NOT NULL,
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
	MapName varchar(32),
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
	PRIMARY KEY (PlayableID, PokeID),
	FOREIGN KEY (PlayableID) REFERENCES Playable(ID) ON DELETE CASCADE,
	FOREIGN KEY (PokeID) REFERENCES Pokemon(ID) ON DELETE CASCADE
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



INSERT INTO MapRegions VALUES('Celadon City', 'City', 0);
INSERT INTO MapRegions VALUES('Cerulean City', 'City', 0);
INSERT INTO MapRegions VALUES('Cinnabar Island', 'City', 0);
INSERT INTO MapRegions VALUES('Diglett''s Cave', 'Cave', 20);
INSERT INTO MapRegions VALUES('Fuchsia City', 'City', 0);
INSERT INTO MapRegions VALUES('Indigo Plateau', 'City', 0);
INSERT INTO MapRegions VALUES('Mt Moon', 'Cave', 20);
INSERT INTO MapRegions VALUES('Pallet Town', 'Town', 3);
INSERT INTO MapRegions VALUES('Pewter City', 'City', 0);
INSERT INTO MapRegions VALUES('Rock Tunnel', 'Cave', 20);
INSERT INTO MapRegions VALUES('Route 1', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 11', 'Path', 20);
INSERT INTO MapRegions VALUES('Route 12', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 2', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 3', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 4', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 5', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 6', 'Path', 20);
INSERT INTO MapRegions VALUES('Route 7', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 8', 'Path', 10);
INSERT INTO MapRegions VALUES('Route 9', 'Path', 10);
INSERT INTO MapRegions VALUES('Saffron City', 'City', 0);
INSERT INTO MapRegions VALUES('Vermilion City', 'City', 0);
INSERT INTO MapRegions VALUES('Victory Road', 'Path', 0);
INSERT INTO MapRegions VALUES('Viridian City', 'City', 0);
INSERT INTO MapRegions VALUES('Viridian Forest', 'Forest', 20);


INSERT INTO Building_Contained VALUES(1, 'Celadon City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(2, 'Celadon City', 'PokeMart');
INSERT INTO Building_Contained VALUES(3, 'Celadon City', 'Gym');
INSERT INTO Building_Contained VALUES(4, 'Cerulean City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(5, 'Cerulean City', 'PokeMart');
INSERT INTO Building_Contained VALUES(6, 'Cerulean City', 'Gym');
INSERT INTO Building_Contained VALUES(7, 'Cinnabar Island', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(8, 'Cinnabar Island', 'PokeMart');
INSERT INTO Building_Contained VALUES(9, 'Cinnabar Island', 'Gym');
INSERT INTO Building_Contained VALUES(10, 'Fuchsia City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(11, 'Fuchsia City', 'PokeMart');
INSERT INTO Building_Contained VALUES(12, 'Fuchsia City', 'Gym');
INSERT INTO Building_Contained VALUES(13, 'Indigo Plateau', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(14, 'Indigo Plateau', 'PokeMart');
INSERT INTO Building_Contained VALUES(15, 'Pewter City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(16, 'Pewter City', 'PokeMart');
INSERT INTO Building_Contained VALUES(17, 'Pewter City', 'Gym');
INSERT INTO Building_Contained VALUES(18, 'Saffron City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(19, 'Saffron City', 'PokeMart');
INSERT INTO Building_Contained VALUES(20, 'Saffron City', 'Gym');
INSERT INTO Building_Contained VALUES(21, 'Vermilion City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(22, 'Vermilion City', 'PokeMart');
INSERT INTO Building_Contained VALUES(23, 'Vermilion City', 'Gym');
INSERT INTO Building_Contained VALUES(24, 'Viridian City', 'Pokemon Center');
INSERT INTO Building_Contained VALUES(25, 'Viridian City', 'PokeMart');
INSERT INTO Building_Contained VALUES(26, 'Viridian City', 'Gym');
INSERT INTO Building_Contained VALUES(27, 'Pallet Town', 'Lab');


INSERT INTO Characters VALUES(1, 'Red', 'Pallet Town');
INSERT INTO Characters VALUES(2, 'Blue', 'Pallet Town');
INSERT INTO Characters VALUES(3, 'Green', 'Pallet Town');
INSERT INTO Characters VALUES(4, 'Yellow', 'Pallet Town');
INSERT INTO Characters VALUES(5, 'Gold', 'Pallet Town');
INSERT INTO Characters VALUES(6, 'Erika', 'Celadon City');
INSERT INTO Characters VALUES(7, 'Misty', 'Cerulean City');
INSERT INTO Characters VALUES(8, 'Blaine', 'Cinnabar Island');
INSERT INTO Characters VALUES(9, 'Koga', 'Fuchsia City');
INSERT INTO Characters VALUES(10, 'Brock', 'Pewter City');
INSERT INTO Characters VALUES(11, 'Sabrina', 'Saffron City');
INSERT INTO Characters VALUES(12, 'Lt.Surge', 'Vermilion City');
INSERT INTO Characters VALUES(13, 'Giovanni', 'Viridian City');
INSERT INTO Characters VALUES(14, 'Professor Oak', 'Pallet Town');
INSERT INTO Characters VALUES(15, 'Trainer Cave', 'Diglett''s Cave');
INSERT INTO Characters VALUES(16, 'Trainer Moon', 'Mt Moon');
INSERT INTO Characters VALUES(17, 'Trainer Tunnel', 'Rock Tunnel');
INSERT INTO Characters VALUES(18, 'Trainer 1', 'Route 1');
INSERT INTO Characters VALUES(19, 'Trainer 11', 'Route 11');
INSERT INTO Characters VALUES(20, 'Trainer 12', 'Route 12');
INSERT INTO Characters VALUES(21, 'Trainer 2', 'Route 2');
INSERT INTO Characters VALUES(22, 'Trainer 3', 'Route 3');
INSERT INTO Characters VALUES(23, 'Trainer 4', 'Route 4');
INSERT INTO Characters VALUES(24, 'Trainer 5', 'Route 5');
INSERT INTO Characters VALUES(25, 'Trainer 6', 'Route 6');
INSERT INTO Characters VALUES(26, 'Trainer 7', 'Route 7');
INSERT INTO Characters VALUES(27, 'Trainer 8', 'Route 8');
INSERT INTO Characters VALUES(28, 'Trainer 9', 'Route 9');
INSERT INTO Characters VALUES(29, 'Trainer Forest', 'Viridian Forest');


INSERT INTO Playable VALUES(1, 'red', 'redpass', TO_DATE('2019-02-11','YYYY-MM-DD'), 5, 5000, 0);
INSERT INTO Playable VALUES(2, 'blue', 'bluepass', TO_DATE('2019-02-12','YYYY-MM-DD'), 0, 1000, 0);
INSERT INTO Playable VALUES(3, 'green', 'greenpass', TO_DATE('2019-02-13','YYYY-MM-DD'), 0, 1000, 0);
INSERT INTO Playable VALUES(4, 'yellow', 'yellowpass', TO_DATE('2019-02-14','YYYY-MM-DD'), 0, 1000, 0);
INSERT INTO Playable VALUES(5, 'gold', 'goldpass', TO_DATE('2019-02-15','YYYY-MM-DD'), 0, 1000, 1);


INSERT INTO NonPlayable VALUES(6, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(7, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(8, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(9, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(10, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(11, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(12, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(13, 'Gym Leader', 1000);
INSERT INTO NonPlayable VALUES(14, 'Non Trainer', 0);
INSERT INTO NonPlayable VALUES(15, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(16, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(17, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(18, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(19, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(20, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(21, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(22, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(23, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(24, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(25, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(26, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(27, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(28, 'Trainer', 500);
INSERT INTO NonPlayable VALUES(29, 'Trainer', 500);


INSERT INTO ItemTypes VALUES('Poke Ball', 200);
INSERT INTO ItemTypes VALUES('Great Ball', 600);
INSERT INTO ItemTypes VALUES('Ultra Ball', 1200);
INSERT INTO ItemTypes VALUES('Master Ball', 6000);
INSERT INTO ItemTypes VALUES('Revive', 1500);


INSERT INTO Items VALUES(1, 'Poke Ball', 1, 0);
INSERT INTO Items VALUES(2, 'Great Ball', 1, 0);
INSERT INTO Items VALUES(3, 'Ultra Ball', 1, 0);
INSERT INTO Items VALUES(4, 'Master Ball', 1, 0);
INSERT INTO Items VALUES(5, 'Revive', 1, 0);
INSERT INTO Items VALUES(6, 'Poke Ball', 1, 1);
INSERT INTO Items VALUES(7, 'Poke Ball', 2, 1);
INSERT INTO Items VALUES(8, 'Poke Ball', 3, 1);
INSERT INTO Items VALUES(9, 'Poke Ball', 4, 1);
INSERT INTO Items VALUES(10, 'Poke Ball', 5, 1);
INSERT INTO Items VALUES(11, 'Revive', 1, 1);
INSERT INTO Items VALUES(12, 'Revive', 1, 1);
INSERT INTO Items VALUES(13, 'Revive', 1, 1);
INSERT INTO Items VALUES(14, 'Revive', 1, 1);
INSERT INTO Items VALUES(15, 'Revive', 1, 1); 


INSERT INTO Species VALUES(1, 'Bulbasaur', 'Grass', 'Poison', 'Pallet Town');
INSERT INTO Species VALUES(2, 'Ivysaur', 'Grass', 'Poison', 'Pallet Town');
INSERT INTO Species VALUES(3, 'Venusaur', 'Grass', 'Poison', 'Pallet Town');
INSERT INTO Species VALUES(4, 'Charmander', 'Fire', NULL, 'Pallet Town');
INSERT INTO Species VALUES(5, 'Charmeleon', 'Fire', NULL, 'Pallet Town');
INSERT INTO Species VALUES(6, 'Charizard', 'Fire', 'Flying', 'Pallet Town');
INSERT INTO Species VALUES(7, 'Squirtle', 'Water', NULL, 'Pallet Town');
INSERT INTO Species VALUES(8, 'Wartortle', 'Water', NULL, 'Pallet Town');
INSERT INTO Species VALUES(9, 'Blastoise', 'Water', NULL, 'Pallet Town');
INSERT INTO Species VALUES(10, 'Caterpie', 'Bug', NULL, 'Viridian Forest');
INSERT INTO Species VALUES(11, 'Metapod', 'Bug', NULL, 'Viridian Forest');
INSERT INTO Species VALUES(12, 'Butterfree', 'Bug', 'Flying', 'Viridian Forest');
INSERT INTO Species VALUES(13, 'Weedle', 'Bug', 'Poison', 'Viridian Forest');
INSERT INTO Species VALUES(14, 'Kakuna', 'Bug', 'Poison', 'Viridian Forest');
INSERT INTO Species VALUES(15, 'Beedrill', 'Bug', 'Poison', 'Viridian Forest');
INSERT INTO Species VALUES(16, 'Pidgey', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(17, 'Pidgeotto', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(18, 'Pidgeot', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(19, 'Rattata', 'Normal', NULL, 'Route 1');
INSERT INTO Species VALUES(20, 'Raticate', 'Normal', NULL, 'Route 1');
INSERT INTO Species VALUES(21, 'Spearow', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(22, 'Fearow', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(23, 'Ekans', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(24, 'Arbok', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(25, 'Pikachu', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(26, 'Raichu', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(27, 'Sandshrew', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(28, 'Sandslash', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(29, 'NidoranF', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(30, 'Nidorina', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(31, 'Nidoqueen', 'Poison', 'Ground', 'Route 3');
INSERT INTO Species VALUES(32, 'NidoranM', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(33, 'Nidorino', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(34, 'Nidoking', 'Poison', 'Ground', 'Route 3');
INSERT INTO Species VALUES(35, 'Clefairy', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(36, 'Clefable', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(37, 'Vulpix', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(38, 'Ninetales', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(39, 'Jigglypuff', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(40, 'Wigglytuff', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(41, 'Zubat', 'Poison', 'Flying', 'Diglett''s Cave');
INSERT INTO Species VALUES(42, 'Golbat', 'Poison', 'Flying', 'Diglett''s Cave');
INSERT INTO Species VALUES(43, 'Oddish', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(44, 'Gloom', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(45, 'Vileplume', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(46, 'Paras', 'Bug', 'Grass', 'Viridian Forest');
INSERT INTO Species VALUES(47, 'Parasect', 'Bug', 'Grass', 'Viridian Forest');
INSERT INTO Species VALUES(48, 'Venonat', 'Bug', 'Poison', 'Viridian Forest');
INSERT INTO Species VALUES(49, 'Venomoth', 'Bug', 'Poison', 'Viridian Forest');
INSERT INTO Species VALUES(50, 'Diglett', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(51, 'Dugtrio', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(52, 'Meowth', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(53, 'Persian', 'Normal', NULL, 'Mt Moon');
INSERT INTO Species VALUES(54, 'Psyduck', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(55, 'Golduck', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(56, 'Mankey', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(57, 'Primeape', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(58, 'Growlithe', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(59, 'Arcanine', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(60, 'Poliwag', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(61, 'Poliwhirl', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(62, 'Poliwrath', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(63, 'Abra', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(64, 'Kadabra', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(65, 'Alakazam', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(66, 'Machop', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(67, 'Machoke', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(68, 'Machamp', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(69, 'Bellsprout', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(70, 'Weepinbell', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(71, 'Victreebel', 'Grass', 'Poison', 'Route 5');
INSERT INTO Species VALUES(72, 'Tentacool', 'Water', 'Poison', 'Route 6');
INSERT INTO Species VALUES(73, 'Tentacruel', 'Water', 'Poison', 'Route 6');
INSERT INTO Species VALUES(74, 'Geodude', 'Rock', 'Ground', 'Rock Tunnel');
INSERT INTO Species VALUES(75, 'Graveler', 'Rock', 'Ground', 'Rock Tunnel');
INSERT INTO Species VALUES(76, 'Golem', 'Rock', 'Ground', 'Rock Tunnel');
INSERT INTO Species VALUES(77, 'Ponyta', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(78, 'Rapidash', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(79, 'Slowpoke', 'Water', 'Psychic', 'Route 6');
INSERT INTO Species VALUES(80, 'Slowbro', 'Water', 'Psychic', 'Route 6');
INSERT INTO Species VALUES(81, 'Magnemite', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(82, 'Magneton', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(83, 'Farfetch''d', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(84, 'Doduo', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(85, 'Dodrio', 'Normal', 'Flying', 'Route 1');
INSERT INTO Species VALUES(86, 'Seel', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(87, 'Dewgong', 'Water', 'Ice', 'Route 6');
INSERT INTO Species VALUES(88, 'Grimer', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(89, 'Muk', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(90, 'Shellder', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(91, 'Cloyster', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(92, 'Gastly', 'Ghost', 'Poison', 'Route 9');
INSERT INTO Species VALUES(93, 'Haunter', 'Ghost', 'Poison', 'Route 9');
INSERT INTO Species VALUES(94, 'Gengar', 'Ghost', 'Poison', 'Route 9');
INSERT INTO Species VALUES(95, 'Onix', 'Rock', 'Ground', 'Rock Tunnel');
INSERT INTO Species VALUES(96, 'Drowzee', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(97, 'Hypno', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(98, 'Krabby', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(99, 'Kingler', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(100, 'Voltorb', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(101, 'Electrode', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(102, 'Exeggcute', 'Grass', 'Psychic', 'Route 5');
INSERT INTO Species VALUES(103, 'Exeggutor', 'Grass', 'Psychic', 'Route 5');
INSERT INTO Species VALUES(104, 'Cubone', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(105, 'Marowak', 'Ground', NULL, 'Diglett''s Cave');
INSERT INTO Species VALUES(106, 'Hitmonlee', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(107, 'Hitmonchan', 'Fighting', NULL, 'Route 7');
INSERT INTO Species VALUES(108, 'Lickitung', 'Normal', NULL, 'Route 1');
INSERT INTO Species VALUES(109, 'Koffing', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(110, 'Weezing', 'Poison', NULL, 'Route 3');
INSERT INTO Species VALUES(111, 'Rhyhorn', 'Ground', 'Rock', 'Rock Tunnel');
INSERT INTO Species VALUES(112, 'Rhydon', 'Ground', 'Rock', 'Rock Tunnel');
INSERT INTO Species VALUES(113, 'Chansey', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(114, 'Tangela', 'Grass', NULL, 'Route 5');
INSERT INTO Species VALUES(115, 'Kangaskhan', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(116, 'Horsea', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(117, 'Seadra', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(118, 'Goldeen', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(119, 'Seaking', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(120, 'Staryu', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(121, 'Starmie', 'Water', 'Psychic', 'Route 6');
INSERT INTO Species VALUES(122, 'Mr. Mime', 'Psychic', NULL, 'Route 8');
INSERT INTO Species VALUES(123, 'Scyther', 'Bug', 'Flying', 'Viridian Forest');
INSERT INTO Species VALUES(124, 'Jynx', 'Ice', 'Psychic', 'Route 11');
INSERT INTO Species VALUES(125, 'Electabuzz', 'Electric', NULL, 'Route 2');
INSERT INTO Species VALUES(126, 'Magmar', 'Fire', NULL, 'Route 4');
INSERT INTO Species VALUES(127, 'Pinsir', 'Bug', 'Flying', 'Viridian Forest');
INSERT INTO Species VALUES(128, 'Tauros', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(129, 'Magikarp', 'Water', NULL, 'Route 6');
INSERT INTO Species VALUES(130, 'Gyarados', 'Water', 'Flying', 'Route 6');
INSERT INTO Species VALUES(131, 'Lapras', 'Water', 'Ice', 'Route 6');
INSERT INTO Species VALUES(132, 'Ditto', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(133, 'Eevee', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(134, 'Vaporeon', 'Water', NULL, 'Route 11');
INSERT INTO Species VALUES(135, 'Jolteon', 'Electric', NULL, 'Route 11');
INSERT INTO Species VALUES(136, 'Flareon', 'Fire', NULL, 'Route 11');
INSERT INTO Species VALUES(137, 'Porygon', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(138, 'Omanyte', 'Rock', 'Water', 'Rock Tunnel');
INSERT INTO Species VALUES(139, 'Omastar', 'Rock', 'Water', 'Rock Tunnel');
INSERT INTO Species VALUES(140, 'Kabuto', 'Rock', 'Water', 'Rock Tunnel');
INSERT INTO Species VALUES(141, 'Kabutops', 'Rock', 'Water', 'Rock Tunnel');
INSERT INTO Species VALUES(142, 'Aerodactyl', 'Rock', 'Flying', 'Route 11');
INSERT INTO Species VALUES(143, 'Snorlax', 'Normal', NULL, 'Route 11');
INSERT INTO Species VALUES(144, 'Articuno', 'Ice', 'Flying', 'Route 12');
INSERT INTO Species VALUES(145, 'Zapdos', 'Electric', 'Flying', 'Route 12');
INSERT INTO Species VALUES(146, 'Moltres', 'Fire', 'Flying', 'Route 12');
INSERT INTO Species VALUES(147, 'Dratini', 'Dragon', NULL, 'Route 12');
INSERT INTO Species VALUES(148, 'Dragonair', 'Dragon', NULL, 'Route 12');
INSERT INTO Species VALUES(149, 'Dragonite', 'Dragon', 'Flying', 'Route 12');
INSERT INTO Species VALUES(150, 'Mewtwo', 'Psychic', NULL, 'Route 12');
INSERT INTO Species VALUES(151, 'Mew', 'Psychic', NULL, 'Route 12');


INSERT INTO Pokemon VALUES(1, 'Bulbasaur', 1, 'Healthy', 0);
INSERT INTO Pokemon VALUES(2, 'Charmander', 4, 'Healthy', 10); 
INSERT INTO Pokemon VALUES(3, 'Squirtle', 7, 'Healthy', 0); 
INSERT INTO Pokemon VALUES(4, 'Pikachu', 25, 'Healthy', 0); 
INSERT INTO Pokemon VALUES(5, 'Eevee', 133, 'Healthy', 0); 


INSERT INTO OwnedBy VALUES(2, 1);
INSERT INTO OwnedBy VALUES(3, 2);
INSERT INTO OwnedBy VALUES(1, 3);
INSERT INTO OwnedBy VALUES(4, 4);
INSERT INTO OwnedBy VALUES(5, 5);


INSERT INTO Pokedex VALUES(1, 1, 30);
INSERT INTO Pokedex VALUES(2, 1, 1);
INSERT INTO Pokedex VALUES(3, 1, 1);
INSERT INTO Pokedex VALUES(4, 1, 1);
INSERT INTO Pokedex VALUES(5, 1, 1);


INSERT INTO GymBadges_Received VALUES(1, 'Boulder Badge', 1, 10, TO_TIMESTAMP('2019-02-11 17:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO GymBadges_Received VALUES(2, 'Cascade Badge', 1, 7, TO_TIMESTAMP('2019-02-11 18:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO GymBadges_Received VALUES(3, 'Thunder Badge', 1, 12, TO_TIMESTAMP('2019-02-11 20:45:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO GymBadges_Received VALUES(4, 'Rainbow Badge', 1, 6, TO_TIMESTAMP('2019-02-12 10:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO GymBadges_Received VALUES(5, 'Soul Badge', 1, 9, TO_TIMESTAMP('2019-02-12 12:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO Sells VALUES(1, 1, 16, 1, TO_TIMESTAMP('2019-02-11 16:50:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Sells VALUES(2, 2, 16, 1, TO_TIMESTAMP('2019-02-11 16:51:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Sells VALUES(3, 3, 16, 1, TO_TIMESTAMP('2019-02-11 16:52:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Sells VALUES(4, 4, 16, 1, TO_TIMESTAMP('2019-02-11 16:53:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Sells VALUES(5, 5, 16, 1, TO_TIMESTAMP('2019-02-11 16:54:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO Heals VALUES(2, 15, 1, TO_TIMESTAMP('2019-02-11 16:45:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Heals VALUES(2, 4, 1, TO_TIMESTAMP('2019-02-11 18:20:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Heals VALUES(2, 21, 1, TO_TIMESTAMP('2019-02-11 20:35:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Heals VALUES(2, 1, 1, TO_TIMESTAMP('2019-02-12 9:50:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Heals VALUES(2, 10, 1, TO_TIMESTAMP('2019-02-12 11:50:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO Battle VALUES(1, 10, TO_TIMESTAMP('2019-02-11 16:55:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Battle VALUES(1, 7, TO_TIMESTAMP('2019-02-11 18:25:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Battle VALUES(1, 12, TO_TIMESTAMP('2019-02-11 20:40:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Battle VALUES(1, 6, TO_TIMESTAMP('2019-02-12 9:55:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO Battle VALUES(1, 9, TO_TIMESTAMP('2019-02-12 11:55:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO MoveAcross VALUES(1, 'Pewter City', TO_TIMESTAMP('2019-02-11 16:44:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO MoveAcross VALUES(1, 'Cerulean City', TO_TIMESTAMP('2019-02-11 18:19:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO MoveAcross VALUES(1, 'Vermilion City', TO_TIMESTAMP('2019-02-11 20:34:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO MoveAcross VALUES(1, 'Celadon City', TO_TIMESTAMP('2019-02-12 9:49:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
INSERT INTO MoveAcross VALUES(1, 'Fuchsia City', TO_TIMESTAMP('2019-02-12 11:49:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO Catches VALUES(1, 2, 6, TO_TIMESTAMP('2019-02-11 16:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Catches VALUES(2, 3, 7, TO_TIMESTAMP('2019-02-12 16:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Catches VALUES(3, 1, 8, TO_TIMESTAMP('2019-02-13 16:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Catches VALUES(4, 4, 9, TO_TIMESTAMP('2019-02-14 16:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Catches VALUES(5, 5, 10, TO_TIMESTAMP('2019-02-15 16:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));


INSERT INTO Uses VALUES(1, 2, 11, TO_TIMESTAMP('2019-02-11 16:35:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Uses VALUES(1, 2, 12, TO_TIMESTAMP('2019-02-11 18:10:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Uses VALUES(1, 2, 13, TO_TIMESTAMP('2019-02-11 20:25:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Uses VALUES(1, 2, 14, TO_TIMESTAMP('2019-02-12 9:40:00.00', 'YYYY-MM-DD HH24:MI:SS.FF')); 
INSERT INTO Uses VALUES(1, 2, 15, TO_TIMESTAMP('2019-02-12 11:40:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'));
