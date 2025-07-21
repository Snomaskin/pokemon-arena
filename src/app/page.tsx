import { fetchPokemon } from "@/utils/fetchPokemon";
import pokemonsArr from "@/data/pokemonsArr";
import ClientShell from "./ClientShell";


export default async function Home() {
  const promises = pokemonsArr.map(pokemon => fetchPokemon(pokemon));
  const pokemons = await Promise.all(promises);

  return (
   <main className="flex w-screen min-h-screen bg-amber-100 justify-center">
    {pokemons ? <ClientShell pokemons={pokemons} /> : <p>Loading...</p>}
   </main>
  );
}