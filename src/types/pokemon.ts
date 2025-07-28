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
  types: string[];
};

export type { Move, Pokemon };