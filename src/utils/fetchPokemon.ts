import { PokemonClient, MoveClient } from "pokenode-ts";
import type { Move, Pokemon } from "@/types/pokemon"; 

const pokemonApi = new PokemonClient();
const moveApi = new MoveClient();

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const data = await pokemonApi.getPokemonByName(name);

  const imageUrl = data.sprites.other?.["official-artwork"]?.front_default ?? "";
  const hp = data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;

  const moves: Move[] = await Promise.all(
    data.moves.map(async ({ move }) => {
      const moveData = await moveApi.getMoveByName(move.name);
      const description =
        moveData.effect_entries.find((entry) => entry.language.name === "en")?.effect ??
        "No description available.";
      return {
        name: move.name,
        description,
      };
    })
  );

  return {
    id: data.id,
    name: data.name,
    imageUrl,
    moves,
    hp,
  };
};
