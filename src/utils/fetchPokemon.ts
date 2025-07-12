import { PokemonClient } from "pokenode-ts";


export interface Ability {
  name: string;
  description: string;
};
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  abilities: Ability[];
  hp: number;
};

const api = new PokemonClient();

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const data = await api.getPokemonByName(name);

  const imageUrl = data.sprites.other?.["official-artwork"]?.front_default ?? "";
  const hp = data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;

  const abilities: Ability[] = await Promise.all(
    data.abilities.map(async ({ ability }) => {
      const abilityData = await api.getAbilityByName(ability.name);
      const description =
        abilityData.effect_entries.find((entry) => entry.language.name === "en")?.effect ??
        "No description available.";
      return {
        name: ability.name,
        description,
      };
    })
  );

  return {
    id: data.id,
    name: data.name,
    imageUrl,
    abilities,
    hp,
  };
};
