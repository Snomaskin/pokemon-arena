import { PokemonClient, MoveClient } from "pokenode-ts";
import type { Move, Pokemon } from "@/types/pokemon"; 

const pokemonApi = new PokemonClient();
const moveApi = new MoveClient();
const pokemonCache = new Map<string, Pokemon>();

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  if (pokemonCache.has(name)) {
    return pokemonCache.get(name)!;
  };
  const data = await pokemonApi.getPokemonByName(name);

  const imageUrl = data.sprites.other?.["official-artwork"]?.front_default ?? "";
  const hp = data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;

  let imageBase64 = "";
  if (imageUrl) {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    imageBase64 = `data:image/png;base64,${base64}`;
  };

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

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    imageUrl: imageBase64,
    moves,
    hp,
  };
  
  pokemonCache.set(name, pokemon);

  return pokemon;
};
