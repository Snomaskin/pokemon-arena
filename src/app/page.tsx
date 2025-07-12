"use client";
import PokemonSelectorGrid from "./components/PokemonSelectorGrid";
import { type Pokemon, fetchPokemon } from "@/utils/fetchPokemon";
import pokemonSelection from "./data/pokemonSelection";
import { useEffect, useState } from "react";


export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  useEffect(() => {

    const fetchPokemons = async () => {
      const promises = pokemonSelection.map(pokemon => fetchPokemon(pokemon));
      const pokemons = await Promise.all(promises);
      setPokemons(pokemons);
    }
    fetchPokemons();
  }, [])

  return (
   <main className="flex w-screen min-h-screen bg-amber-100 justify-center">
    {pokemons ? <PokemonSelectorGrid pokemons={pokemons} /> : <p>Loading...</p>}
   </main>
  );
}
