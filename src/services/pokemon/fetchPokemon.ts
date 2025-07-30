import { PokemonClient, MoveClient, PokemonMove } from "pokenode-ts";
import type { Move, Pokemon } from "@/types/pokemon"; 

const pokemonApi = new PokemonClient();
const moveApi = new MoveClient();
const pokemonCache = new Map<string, Pokemon>();

export default async function fetchPokemon(name: string): Promise<Pokemon> {
  if (pokemonCache.has(name)) {
    return pokemonCache.get(name)!;
  };
  const data = await pokemonApi.getPokemonByName(name);

  const imageUrl = data.sprites.other?.["official-artwork"]?.front_default ?? "";
  const hp = data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;
  const attack = data.stats.find(s => s.stat.name === "attack")?.base_stat ?? 0;
  const defense = data.stats.find(s => s.stat.name === "defense")?.base_stat ?? 0;
  const types = data.types.map(p => p.type.name);
  const moves = await getMoves(data.moves);

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    imageUrl,
    moves,
    hp,
    attack,
    defense,
    types,
  };
  
  pokemonCache.set(name, pokemon);

  return pokemon;
};

async function getMoves(movesData: PokemonMove[]) {
  const GEN_VERSION = "red-blue";

  const levelUpMoves = movesData
    .filter(({ version_group_details }) =>
      version_group_details.some(
        (detail) =>
          detail.version_group.name === GEN_VERSION &&
          detail.move_learn_method.name === "level-up"
      )
    )
    .map(({ move, version_group_details }) => {
      const detail = version_group_details.find(d =>
        d.version_group.name === GEN_VERSION &&
        d.move_learn_method.name === "level-up"
      );
      return {
        move,
        level: detail?.level_learned_at ?? 0,
      };
    })
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  const moveResults = await Promise.all(
    levelUpMoves.map(async ({ move }) => {
      const moveData = await moveApi.getMoveByName(move.name);
      const power = moveData.power;

      if (!power) return null;

      const description =
        moveData.effect_entries.find((entry) => entry.language.name === "en")?.effect ??
        "No description available.";
      const type = moveData.type.name;
      return {
        name: move.name,
        description,
        type,
        power,
      };
    })
  );

  const moves: Move[] = moveResults.filter((m): m is Move => m !== null)
  
  return moves;
}