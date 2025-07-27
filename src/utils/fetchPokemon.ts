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
  const types = data.types.map(p => p.type.name);

  const GEN_VERSION = "scarlet-violet";

  const level1Moves = data.moves
    .filter(({ version_group_details }) =>
      version_group_details.some(
        (detail) =>
          detail.version_group.name === GEN_VERSION &&
          detail.move_learn_method.name === "level-up" &&
          detail.level_learned_at === 1
      )
    )
    .map(({ move }) => move);

  const moves: Move[] = await Promise.all(
    level1Moves.map(async (move) => {
      const moveData = await moveApi.getMoveByName(move.name);
      const description =
        moveData.effect_entries.find((entry) => entry.language.name === "en")?.effect ??
        "No description available.";
      const type = moveData.type.name;
      const power = moveData.power;
      return {
        name: move.name,
        description,
        type,
        power,
      };
    }))

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    imageUrl,
    moves,
    hp,
    types,
  };
  
  pokemonCache.set(name, pokemon);

  return pokemon;
};
