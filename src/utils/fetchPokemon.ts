interface Ability {
  name: string;
  description: string;
};
interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  abilities: Ability[];
  hp: number;
};

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const res = await fetch(pokemonUrl);
  const data = await res.json();

  const imageUrl = data.sprites.other["official-artwork"].front_default;
  const hp = data.stats.find((s: any) => s.stat.name === "hp")?.base_stat ?? 0;
    const abilities: Ability[] = await Promise.all(
    data.abilities.map(async (abilityObj: any) => {
      const name = abilityObj.ability.name;
      const url = abilityObj.ability.url;

      const abilityRes = await fetch(url);
      const abilityData = await abilityRes.json();

      const description =
        abilityData.effect_entries.find((entry: any) => entry.language.name === "en")?.effect ??
        "No description available.";

      return {
        name,
        description,
      };
    })
  );

  return {
    id: data.id,
    name: data.name,
    imageUrl,
    abilities,
    hp
  };
};

export {type Pokemon, fetchPokemon};