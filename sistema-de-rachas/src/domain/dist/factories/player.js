"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerFactory = void 0;
const uid_1 = require("uid");
const player_1 = require("../entities/player");
const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Hank',
    'Ivy',
    'Jack',
    'Kara',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Paul',
    'Quinn',
    'Rita',
    'Sam',
    'Tina',
    'Uma',
    'Vince',
    'Wendy',
    'Xander',
    'Yara',
    'Zack',
];
const generateRandomName = () => {
    const index = Math.floor(Math.random() * names.length);
    return names[index];
};
const generateRandomStars = () => {
    return Math.floor(Math.random() * 5) + 1; // Generates a number between 1 and 5
};
const createRandomPlayer = () => {
    const params = {
        id: (0, uid_1.uid)(),
        name: generateRandomName(),
        stars: generateRandomStars(),
    };
    return new player_1.Player(params);
};
const playerFactory = (quantity) => {
    const players = [];
    for (let i = 0; i < quantity; i++) {
        players.push(createRandomPlayer());
    }
    return players;
};
exports.playerFactory = playerFactory;
