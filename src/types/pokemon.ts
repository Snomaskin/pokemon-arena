interface Move {
  name: string;
  description: string;
};
interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  moves: Move[];
  hp: number;
};

export type { Move, Pokemon };