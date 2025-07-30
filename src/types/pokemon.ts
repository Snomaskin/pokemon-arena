interface Move {
  name: string;
  description: string;
  type: string;
  power: number;
};
interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  moves: Move[];
  hp: number;
  attack: number;
  defense: number;
  types: string[];
  isDefeated?: boolean;
};

export type { Move, Pokemon };