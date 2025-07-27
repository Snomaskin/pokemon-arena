import { Pokemon } from "@/types/pokemon";


const pokemonCache = new Map<number, Pokemon>();

export default async function pokemonWithBase64Img(pokemon: Pokemon): Promise<Pokemon> {
  if (pokemonCache.has(pokemon.id)) {
    return pokemonCache.get(pokemon.id)!;
  };
  
  const response = await fetch(pokemon.imageUrl);
  const blob = await response.blob();
  const base64 = await blobToBase64(blob);

  const newPokemon: Pokemon = {
    ...pokemon,
    imageUrl: base64,
  };

  pokemonCache.set(pokemon.id, newPokemon);

  return newPokemon;
};

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob); 
  });
};