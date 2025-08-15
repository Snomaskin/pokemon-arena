import fetchPokemon from "@/services/pokemon/fetchPokemon";
import pokemonsArr from "@/data/pokemonsArr";
import ClientShell from "./ClientShell";
import GameSetupStart from "./GameSetupStart";
import { Pokemon } from "@/types/pokemon";


export default async function Home() {
const pokemons = (await Promise.allSettled(pokemonsArr.map(fetchPokemon)))
  .map(result => result.status === 'fulfilled' ? result.value : null)
  .filter((pokemon): pokemon is Pokemon => pokemon !== null);

  return (
   <main className="flex w-screen min-h-screen bg-amber-100 justify-center">
    {pokemons ? <ClientShell pokemons={pokemons} /> : <p>Loading...</p>}
    <GameSetupStart />
   </main>
  );
}