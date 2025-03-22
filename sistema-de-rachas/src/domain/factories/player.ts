import { uid } from 'uid';

import { Player, PlayerParams } from '../entities/player';

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

const generateRandomName = (): string => {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
};

const generateRandomStars = (): number => {
  return Math.floor(Math.random() * 5) + 1; // Generates a number between 1 and 5
};

const createRandomPlayer = (): Player => {
  const params: PlayerParams = {
    id: uid(),
    name: generateRandomName(),
    stars: generateRandomStars(),
  };
  return new Player(params);
};

export const playerFactory = (quantity: number): Player[] => {
  const players: Player[] = [];
  for (let i = 0; i < quantity; i++) {
    players.push(createRandomPlayer());
  }
  return players;
};
