import PokemonSelectorGrid from "./components/PokemonSelectorGrid";
import { fetchPokemon } from "@/utils/fetchPokemon";
import pokemonSelection from "./data/pokemonSelection";


export default async function Home() {
  const promises = pokemonSelection.map(pokemon => fetchPokemon(pokemon));
  const pokemons = await Promise.all(promises);

  return (
   <main className="flex w-screen min-h-screen bg-amber-100 justify-center">
    {pokemons ? <PokemonSelectorGrid pokemons={pokemons} /> : <p>Loading...</p>}
   </main>
  );
}
